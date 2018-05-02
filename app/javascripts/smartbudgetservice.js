// export needed for ES6 module dependency
export const SmartBudgetService = {

    /**
     * Access the SmartBudget contract via dependency injection
     */
    _smartBudgetContract: null,

    _account: null,

    /**
     * Check whether this tree node has the defined index
     * @returns true/false
     */
    _isTreeElem: function _isTreeElem(treeNode, idx) {
        return treeNode.id == idx;
    },

    /**
     * Find and return tree node with defined index
     * @returns node or undefined
     */
    _findTreeElem: function _findTreeElem(treeNode, idx) {
        if (SmartBudgetService._isTreeElem(treeNode, idx)) {
            return treeNode;
        }
        else {
            for (var i = 0; i < treeNode.children.length; i++) {
                var found = _findTreeElem(treeNode.children[i], idx);
                if (typeof found !== 'undefined') {
                    return found;
                }
            }
        }
    },

    /**
     * Iterates over the tree DFS manner
     */
    _visitTree: function _visitTree(treeNode, visitorCallback) {
        visitorCallback(treeNode);
        treeNode.children.forEach((val) => SmartBudgetService._visitTree(val, visitorCallback));
    },

    /** convert triplet coming from contract to
     *  [[{id: 0}, {id: 0}, ...], 
     *  [{stake: 100}, {stake: 15}, ...], 
     *  [{parentid: 0}, {parentid: 1}, ...]]
     */
    _convertTriplet1: function (triplet) {
        function convertToNumber(val) {
            // web3js returns integers in BigNumber object that we convert to javascript number
            return typeof val === 'object' && val.hasOwnProperty('c') ? val.toNumber() : val;
        }

        triplet[0] = triplet[0].map((val) => { return { id: convertToNumber(val) } });
        triplet[1] = triplet[1].map((val) => { return { stake: val } });
        triplet[2] = triplet[2].map((val) => { return { parentid: convertToNumber(val) } });
        triplet[3] = triplet[3].map((val) => { return { address: val } });

        return triplet;
    },

    /**
     * Reduce input from the output _convertTriplet1 to
     * [{id: 0, stake: 100, parentid: 0}, ... ]
     */
    _convertTriplet2: function (triplet1) {
        return triplet1.reduce(
            (acc, curr) => {
                curr.forEach((element, i) => {
                    if (typeof acc[i] === 'undefined') {
                        acc[i] = { children: [] };
                    }

                    // copy the properties to the same index in acc array
                    Object.assign(acc[i], element);
                })
                return acc;
            }, []);
    },

    /**
     * Build Tree from the output of _convertTriplet2
     */
    _convertTriplet3: function (flatTree) {
        var newTreeRoot = { id: -1, children: [] };

        flatTree.forEach((val, index) => {
            var foundParent = SmartBudgetService._findTreeElem(newTreeRoot, val.parentid);

            if (typeof foundParent === 'undefined') {
                newTreeRoot.children.push(val);
            }
            else {
                foundParent.children.push(val);
            }
        });

        return newTreeRoot.children;
    },

    /**
     * Build a tree from nodes triplet
     */
    _convertNodesTripletToTree: function (nodesArray) {
        nodesArray = SmartBudgetService._convertTriplet1(nodesArray);
        nodesArray = SmartBudgetService._convertTriplet2(nodesArray);
        return SmartBudgetService._convertTriplet3(nodesArray);
    },

    init: function (smartBudgetContract, account) {
        var self = this;
        self._smartBudgetContract = smartBudgetContract;
        self._account = account;
    },
    
    getAddress: function() {
        var self = this;
        
        return self._smartBudgetContract.deployed().then(function (instance) {
            return instance.address;
        });
    },
    

    /**
     * Get the nodes from the smart contract
     */
    getContractors: function () {
        var self = this;
        var meta;


        return self._smartBudgetContract.deployed().then(function (instance) {
            meta = instance;
            return meta.nodeCntr();
        }).then(function (nodeCntr) {
            var lastId = nodeCntr - 1;
            console.log("NodeCntr is "+ nodeCntr);
            return meta.getNodesWeb.call(0, lastId, { from: self._account, gas: 500000 });
        }).then(function (nodesArray) {
            console.log("The returned nodesArray is " + nodesArray);
            // (int[] _ids, uint[] _stakes, int[] _parentIds, address[] _addresses)
            var newTree =  self._convertNodesTripletToTree(nodesArray);

            return newTree;
        });
    },


    

    /**
     * The recursive function that gets the details for the nodes
     */
    visitNode: async function (contract, nodeId, currDepth, maxDepth) {
        // Get node by ID    
        // Check if we have reached the max depth
        if (currDepth >= maxDepth) {
            return {};
        } else {
            /** "stake" : "Stake of node",
            *   "addr" : "Address of node",
            *   "state" : "State of node",
            *   "cands" : "Array of candidate ids",
            *   "desc" : "Description of node",
            *   "parent" : "Id of parent node",
            *   "childs" : "Array of child node ids"
            */
            //console.log("[visitNode] Loading node with id " + nodeId);
            var attributes = await contract.getNodeWeb(nodeId, { from: self._account, gas: 500000 });
            //console.log("[visitNode] Loaded node with id " + nodeId + ", attributes are: " + attributes);
            var childIds = attributes[6].map((id) => id.toNumber());
            //console.log("[visitNode] Loading children with ids: " + childIds);
            var childList;
            if (childIds.length > 0) {
                childList = await Promise.all(childIds.map( async (childId) => await this.visitNode(contract, childId, currDepth + 1, maxDepth) ));
            } else {
                childIds = [];
                childList = [];
            }
            var smartNode = {id: nodeId, 
                stake: attributes[0].toNumber(),
                address: attributes[1],
                state: attributes[2],
                candidates: attributes[3],
                name: attributes[4],
                parent: attributes[5].toNumber(),
                childIds: childIds,
                children: childList};
            console.log("[visitNode] Loaded node with id " + nodeId + ", the result is: " + JSON.stringify(smartNode));
            return smartNode;
        }
    },

    /**
     * Get the complete node subtree starting from startNode. The maximum allowed depth is maxDepth
     */
    getSubTree: async function (contract, startNode, maxDepth) {
        var nodeCntr = await contract.nodeCntr();
        var lastId = nodeCntr - 1;
        //console.log("[getSubTree] NodeCntr is "+ nodeCntr);
        var subTree = await this.visitNode(contract, startNode, 0, maxDepth);
        return subTree;
    },

    /**
     * Create contractors
     */
    addContractor: function (parentid, desc) {
        var self = this;

        var meta;
        var nodeAddedEvent;

        return self._smartBudgetContract.deployed().then(function (instance) {
            return instance.addNode.sendTransaction(desc, parentid, { from: self._account, gas: 500000 });
        });
    },

    assignAddress: function (address) {
        // TODO: assign an ethereum address for the contractor node
    },

    deleteContractor: function (id) {
        //
    }
};
