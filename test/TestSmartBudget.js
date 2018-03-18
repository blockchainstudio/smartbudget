var SmartBudget = artifacts.require("./SmartBudget.sol");
// Some help on the available functions:
// https://github.com/trufflesuite/truffle-contract

// http://truffleframework.com/docs/getting_started/javascript-tests#use-contract-instead-of-describe-
contract('SmartBudget', function(accounts) {
  it("should have a root node after deployment", function() {
    var tree;
    var root_acc = accounts[0];
    SmartBudget.defaults({from: root_acc});

    var tenderLockTime = 1000; // in seconds or unix timestamp
    var tenderLockType = 1; // 0 = absolute, 1 = relative
    var deliveryLockTime = 2000; // in seconds or unix timestamp
    var deliveryLockType = 1; // 0 = absolute, 1 = relative
    var initStake = web3.toWei(0.01, 'ether');
    return SmartBudget.new(tenderLockTime, tenderLockType, deliveryLockTime, deliveryLockType, {from: root_acc, value: initStake}).then(function(instance) {
        tree = instance;
        return tree.getNodesWeb.call();
      }).then(function (nodesArray) {
        // (int[] _ids, uint[] _stakes, int[] _parentIds, address[] _addresses)
        assert.equal(nodesArray[0].length, 1, "Contract should have exatly one node after deployment!");
        var id = nodesArray[0][0];
        var stake = nodesArray[1][0].toNumber();  // Originally it is a BigInt, we need to convert it
        var parent = nodesArray[2][0];
        var address = nodesArray[3][0];
        assert.equal(id, 0, "Root id must be 0!");
        assert.equal(stake, initStake, "Root stake not set correctly!");
        assert.equal(parent, 0, "Root's parent must be itself (parent id = 0)!");
        assert.equal(address, root_acc, "Root address must be the first account in Ganache!");
    });
  });
  it("should approve candidate for first node", function() {
    var tree;
    var root_acc = accounts[0];
    var child_acc = accounts[1];

    var tenderLockTime = 1000; // in seconds or unix timestamp
    var tenderLockType = 1; // 0 = absolute, 1 = relative
    var deliveryLockTime = 2000; // in seconds or unix timestamp
    var deliveryLockType = 1; // 0 = absolute, 1 = relative
    var initStake = web3.toWei(0.01, 'ether');
    var nodeDesc = "First node";
    var parentId = 0;
    var nodeId = 1;
    var candidateId = 0;
    var candidateName = "First candidate";
    var candidateStake = web3.toWei(0.005, 'ether'); // in ether
    return SmartBudget.new(tenderLockTime, tenderLockType, deliveryLockTime, deliveryLockType, {from: root_acc, value: initStake}).then(function(instance) {
        tree = instance;
        return  tree.getAvailableStake.call(0);
      }).then( function(availStakeRoot) {
        assert.equal(availStakeRoot.toNumber(), initStake, "After deployment, init stake should be unchanged!");
        return tree.getAllocatedStake.call(0);
      }).then( function(allocStakeRoot) {
        assert.equal(allocStakeRoot.toNumber(), 0, "After deployment, there should not be any allocated stake!");


        console.log("Adding new node");
        return tree.addNode(nodeDesc, parentId);
      }).then( function(result) {
        // result.tx => transaction hash, string
        // result.logs => array of trigger events (1 item in this case)
        // result.receipt => receipt object
        return  tree.getAvailableStake.call(0);
      }).then( function(availStakeRoot) {
        assert.equal(availStakeRoot.toNumber(), initStake, "After adding first empty node, init stake should be unchaged!");
        return  tree.getAllocatedStake.call(0);
      }).then( function(allocStakeRoot) {
        assert.equal(allocStakeRoot.toNumber(), 0, "After adding first empty node, there should not be any allocated stake!");


        console.log("Applying for node");
        return tree.applyForNode(nodeId, candidateName, candidateStake, {from: child_acc});
      }).then( function(result) {
        // result.tx => transaction hash, string
        // result.logs => array of trigger events (1 item in this case)
        // result.receipt => receipt object


        console.log("Approving candidate");
        return tree.approveNode(nodeId, candidateId);
      }).then( function(result) {
        // result.tx => transaction hash, string
        // result.logs => array of trigger events (1 item in this case)
        // result.receipt => receipt object
        return tree.getNodesWeb.call();
      }).then(function (nodesArray) {


        // (int[] _ids, uint[] _stakes, int[] _parentIds, address[] _addresses)
        assert.equal(nodesArray[0].length, 2, "Contract should have exatly 2 nodes after one node addition!");
        var id = nodesArray[0][1];
        var stake = nodesArray[1][1].toNumber();  // Originally it is a BigInt, we need to convert it
        var parent = nodesArray[2][1];
        var address = nodesArray[3][1];
        assert.equal(id, 1, "Node id must be 1!");
        assert.equal(stake, candidateStake, "Child node stake is incorrect!");
        assert.equal(parent, 0, "The parent of the first node must be root, which should have id = 0!");
        assert.equal(address, child_acc, "The address of the first node must be child_acc!");
    });
  });
});
