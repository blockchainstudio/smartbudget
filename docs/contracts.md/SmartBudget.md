* [SmartBudget](#smartbudget)
  * [getCandidateWeb](#function-getcandidateweb)
  * [topSubProjectsNum](#function-topsubprojectsnum)
  * [candidateCntr](#function-candidatecntr)
  * [validateNodeId](#function-validatenodeid)
  * [withdraw](#function-withdraw)
  * [tenderLockTime](#function-tenderlocktime)
  * [addNode](#function-addnode)
  * [approvedTopSubProjectsNum](#function-approvedtopsubprojectsnum)
  * [approveNode](#function-approvenode)
  * [version](#function-version)
  * [validateCandidateId](#function-validatecandidateid)
  * [getNodesWeb](#function-getnodesweb)
  * [getContractState](#function-getcontractstate)
  * [toUnixTime](#function-tounixtime)
  * [getNodeVars](#function-getnodevars)
  * [requireNodeOwner](#function-requirenodeowner)
  * [deliveryLockTime](#function-deliverylocktime)
  * [transferFunds](#function-transferfunds)
  * [applyForNode](#function-applyfornode)
  * [getLockState](#function-getlockstate)
  * [getCandidatesWeb](#function-getcandidatesweb)
  * [validateStake](#function-validatestake)
  * [requireNodeParentOwner](#function-requirenodeparentowner)
  * [requireContractState](#function-requirecontractstate)
  * [getNodeStatic](#function-getnodestatic)
  * [cancel](#function-cancel)
  * [extendLockTimes](#function-extendlocktimes)
  * [nodeCntr](#function-nodecntr)
  * [requireNodeState](#function-requirenodestate)
  * [markNodeComplete](#function-marknodecomplete)
  * [SBCreation](#event-sbcreation)
  * [SBNodeAdded](#event-sbnodeadded)
  * [SBCandidateAdded](#event-sbcandidateadded)
  * [SBCandidateApproved](#event-sbcandidateapproved)
  * [SBNodeCompleted](#event-sbnodecompleted)
* [TimeLock](#timelock)
  * [tenderLockTime](#function-tenderlocktime)
  * [toUnixTime](#function-tounixtime)
  * [deliveryLockTime](#function-deliverylocktime)
  * [transferFunds](#function-transferfunds)
  * [getLockState](#function-getlockstate)
  * [extendLockTimes](#function-extendlocktimes)

# SmartBudget


## *function* getCandidateWeb

SmartBudget.getCandidateWeb(candidateId) `view` `1806f659`

**[web3js] Get a candidate by Id (id is the key in context of map)**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | candidateId | Id of the candidate |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | name | Name of the  candidate |
| *uint256* | stake | Proposed stake of candidate |
| *address* | addr | Address of candidate |

## *function* topSubProjectsNum

SmartBudget.topSubProjectsNum() `view` `19945976`





## *function* candidateCntr

SmartBudget.candidateCntr() `view` `1c2734d3`





## *function* validateNodeId

SmartBudget.validateNodeId(nodeId) `view` `1d7c5e76`

**Validates if 0 <= nodeId < nodeCntr**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | The node id to validate |


## *function* withdraw

SmartBudget.withdraw(nodeId) `nonpayable` `2e1a7d4d`

**Withdraw promised amount**

> We require here an id to prevent the runtime scale linearly with the number of nodes. Frontend should get all node details and find the id. However, address is checked here!

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | The id of the node to retreive the promised amount from |


## *function* tenderLockTime

SmartBudget.tenderLockTime() `view` `3d0ced49`





## *function* addNode

SmartBudget.addNode(desc, parentId) `nonpayable` `44be7f70`

**Add a new empty node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | desc | Description of node |
| *uint256* | parentId | Parent's id of node |


## *function* approvedTopSubProjectsNum

SmartBudget.approvedTopSubProjectsNum() `view` `5136cf0f`





## *function* approveNode

SmartBudget.approveNode(nodeId, candidateId) `nonpayable` `546c93c5`

**Set certain node state to APPROVED**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | Id of the node |
| *uint256* | candidateId | Id of candidate |


## *function* version

SmartBudget.version() `pure` `54fd4d50`

**Returns the version of the contract**





## *function* validateCandidateId

SmartBudget.validateCandidateId(candidateId) `view` `69bebc3f`

**Validates if 0 <= candidateId < candidateCntr**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | candidateId | The candidate id to validate |


## *function* getNodesWeb

SmartBudget.getNodesWeb(firstNodeId, lastNodeId) `view` `70c7a4a7`

**[web3js] Get the most important details of nodes where firstNodeIf <= nodeId <= lastNodeId. Can be used to build the tree on JS side**

> Due to limitations in Solidity, we can only return tuples of arrays, but not tuples of array of arrays (e.g. array of strings) 

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | firstNodeId | Starting id |
| *uint256* | lastNodeId | Ending id |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256[]* | _ids | ids of the nodes |
| *uint256[]* | _stakes | stakes of the nodes |
| *uint256[]* | _parents | parents of the nodes |
| *address[]* | _addresses | addresses of the nodes |

## *function* getContractState

SmartBudget.getContractState() `view` `7f4e4849`

**Gets the contract's state**





## *function* toUnixTime

SmartBudget.toUnixTime(_time, _type) `view` `83b52eb4`

**Standardize relative or absolute time specification to unix timestamp**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _time | undefined |
| *uint256* | _type | undefined |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | unixtime | The unix timestamp |

## *function* getNodeVars

SmartBudget.getNodeVars(nodeId) `view` `900556a1`

**[web3js] Get the variables (changeable attributes) of node by Id (id is the key in context of map)**

> Solidity function cannot return more than 7 variables in a single return statement, so we had to split the original getNodeWeb

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | Id of the node |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | stake | Stake of node |
| *uint8* | state | State of node |
| *uint256[]* | cands | Array of candidate ids |
| *uint256[]* | childs | Array of child node ids |

## *function* requireNodeOwner

SmartBudget.requireNodeOwner(nodeId) `view` `949004a0`

**Verifies if the message sender is the owner of the node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | The node Id |


## *function* deliveryLockTime

SmartBudget.deliveryLockTime() `view` `97e292bc`





## *function* transferFunds

SmartBudget.transferFunds(recipient, amount) `nonpayable` `990dc9db`

**Send amount to recipient's address after the delivery time lock has expired**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | recipient | The recipient |
| *uint256* | amount | The amount |


## *function* applyForNode

SmartBudget.applyForNode(nodeId, name, stake) `nonpayable` `ac35de92`

**Add candidate to certain node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | Id of the node |
| *string* | name | Candidate's name |
| *uint256* | stake | Stake demanded by the candidate |


## *function* getLockState

SmartBudget.getLockState() `view` `cc7d9ade`

**Returns the current lock status enum**




Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | lockState | LockState enum representing the contract status |

## *function* getCandidatesWeb

SmartBudget.getCandidatesWeb(firstCandidateId, lastCandidateId) `view` `d11b4ccb`

**[web3js] Get the most important candidate details where firstCandidateId <= candidateId <= lastCandidateId. Can be used to scan the candidate addresses**

> Due to limitations in Solidity, we can only return tuples of arrays, but not tuples of array of arrays (e.g. array of strings) 

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | firstCandidateId | Starting id |
| *uint256* | lastCandidateId | Ending id |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256[]* | _ids | ids of the candidates |
| *uint256[]* | _stakes | stakes of the candidates |
| *address[]* | _addresses | addresses of the candidates |

## *function* validateStake

SmartBudget.validateStake(stake, nodeId) `view` `d4650023`

**Checks if 'stake' amount of ethereum is still available for allocation in node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | stake | The amount of ethereum planned to be allocated for the new node |
| *uint256* | nodeId | Id of node |


## *function* requireNodeParentOwner

SmartBudget.requireNodeParentOwner(nodeId) `view` `de06c354`

**Verifies if the message sender is the owner of the parent of the node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | The node Id, whose parent will be checked |


## *function* requireContractState

SmartBudget.requireContractState(state) `view` `e60a0bf2`

**Requires the contract to be in a specific state**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | state | The expected state |


## *function* getNodeStatic

SmartBudget.getNodeStatic(nodeId) `view` `e77842f6`

**[web3js] Get the static (non-changeable) attributes of node by Id (id is the key in context of map)**

> Solidity function cannot return more than 7 variables in a single return statement, so we had to split the original getNodeWeb

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | Id of the node |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | totalStake | undefined |
| *address* | addr | undefined |
| *string* | desc | undefined |
| *uint256* | parent | undefined |

## *function* cancel

SmartBudget.cancel() `nonpayable` `ea8a1af0`

**Withdraw all funds from contract if the project has been cancelled**

> Allows the root owner to withdraw all funds in case state is cancelled




## *function* extendLockTimes

SmartBudget.extendLockTimes(_tenderLockTime, _tenderLockType, _deliveryLockTime, _deliveryLockType) `nonpayable` `ead30a20`

**Extend lock times**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _tenderLockTime | Tender lock time, absolute or relative |
| *uint256* | _tenderLockType | Tender lock type, 0 for absolute, 1 for relative |
| *uint256* | _deliveryLockTime | Delivery lock time, absolute or relative |
| *uint256* | _deliveryLockType | Delivery lock type, 0 for absolute, 1 for relative |


## *function* nodeCntr

SmartBudget.nodeCntr() `view` `ef5bd6e8`





## *function* requireNodeState

SmartBudget.requireNodeState(nodeId, state) `view` `f5a098af`

**Requires the selected node to be in a specific state**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | The node Id |
| *uint256* | state | The expected state of the node |


## *function* markNodeComplete

SmartBudget.markNodeComplete(nodeId) `nonpayable` `f7e8db3c`

**Set certain node state to COMPLETED**

> The root can mark a node as complete after the tender period

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | nodeId | Id of the node |



## *event* SBCreation

SmartBudget.SBCreation(owner, version, stake) `9ab7c601`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | version | indexed |
| *uint256* | stake | not indexed |

## *event* SBNodeAdded

SmartBudget.SBNodeAdded(owner, id) `54ad5106`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | id | not indexed |

## *event* SBCandidateAdded

SmartBudget.SBCandidateAdded(owner, id) `30a338bd`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | id | not indexed |

## *event* SBCandidateApproved

SmartBudget.SBCandidateApproved(owner, id) `d8036122`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | id | not indexed |

## *event* SBNodeCompleted

SmartBudget.SBNodeCompleted(owner, id) `00397d9e`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *uint256* | id | not indexed |


---
# TimeLock


## *function* tenderLockTime

TimeLock.tenderLockTime() `view` `3d0ced49`





## *function* toUnixTime

TimeLock.toUnixTime(_time, _type) `view` `83b52eb4`

**Standardize relative or absolute time specification to unix timestamp**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _time | undefined |
| *uint256* | _type | undefined |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | unixtime | The unix timestamp |

## *function* deliveryLockTime

TimeLock.deliveryLockTime() `view` `97e292bc`





## *function* transferFunds

TimeLock.transferFunds(recipient, amount) `nonpayable` `990dc9db`

**Send amount to recipient's address after the delivery time lock has expired**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | recipient | The recipient |
| *uint256* | amount | The amount |


## *function* getLockState

TimeLock.getLockState() `view` `cc7d9ade`

**Returns the current lock status enum**




Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | lockState | LockState enum representing the contract status |

## *function* extendLockTimes

TimeLock.extendLockTimes(_tenderLockTime, _tenderLockType, _deliveryLockTime, _deliveryLockType) `nonpayable` `ead30a20`

**Extend lock times**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _tenderLockTime | Tender lock time, absolute or relative |
| *uint256* | _tenderLockType | Tender lock type, 0 for absolute, 1 for relative |
| *uint256* | _deliveryLockTime | Delivery lock time, absolute or relative |
| *uint256* | _deliveryLockType | Delivery lock type, 0 for absolute, 1 for relative |




---