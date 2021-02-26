import { AbiItem } from 'web3-utils'

const abi: AbiItem[] = [{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"validatorCount","inputs":[],"constant":true},{"type":"function","stateMutability":"pure","payable":false,"outputs":[{"type":"uint64","name":"major"},{"type":"uint64","name":"minor"},{"type":"uint64","name":"patch"}],"name":"getBridgeValidatorsInterfacesVersion","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isInitialized","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"removeValidator","inputs":[{"type":"address","name":"_validator"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"addValidator","inputs":[{"type":"address","name":"_validator"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":""}],"name":"initialize","inputs":[{"type":"uint256","name":"_requiredSignatures"},{"type":"address[]","name":"_initialValidators"},{"type":"address","name":"_owner"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"setRequiredSignatures","inputs":[{"type":"uint256","name":"_requiredSignatures"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"requiredSignatures","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"owner","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"deployedAtBlock","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"validators","inputs":[{"type":"address","name":"_validator"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isValidator","inputs":[{"type":"address","name":"_validator"}],"constant":true},{"type":"event","name":"ValidatorAdded","inputs":[{"type":"address","name":"validator","indexed":true}],"anonymous":false},{"type":"event","name":"ValidatorRemoved","inputs":[{"type":"address","name":"validator","indexed":true}],"anonymous":false},{"type":"event","name":"RequiredSignaturesChanged","inputs":[{"type":"uint256","name":"requiredSignatures","indexed":false}],"anonymous":false},{"type":"event","name":"EternalOwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":false},{"type":"address","name":"newOwner","indexed":false}],"anonymous":false}]

export default abi
