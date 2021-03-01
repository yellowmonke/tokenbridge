import { AbiItems } from './AbiItems'

const abi: { [key: string]: AbiItems } = {
  NATIVE: [
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'uint256', name: '' }],
      name: 'validatorCount',
      inputs: [],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'pure',
      payable: false,
      outputs: [
        { type: 'uint64', name: 'major' },
        { type: 'uint64', name: 'minor' },
        { type: 'uint64', name: 'patch' }
      ],
      name: 'getBridgeValidatorsInterfacesVersion',
      inputs: [],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'bool', name: '' }],
      name: 'isInitialized',
      inputs: [],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      payable: false,
      outputs: [],
      name: 'removeValidator',
      inputs: [{ type: 'address', name: '_validator' }],
      constant: false
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      payable: false,
      outputs: [],
      name: 'addValidator',
      inputs: [{ type: 'address', name: '_validator' }],
      constant: false
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      payable: false,
      outputs: [{ type: 'bool', name: '' }],
      name: 'initialize',
      inputs: [
        { type: 'uint256', name: '_requiredSignatures' },
        { type: 'address[]', name: '_initialValidators' },
        { type: 'address', name: '_owner' }
      ],
      constant: false
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      payable: false,
      outputs: [],
      name: 'setRequiredSignatures',
      inputs: [{ type: 'uint256', name: '_requiredSignatures' }],
      constant: false
    },
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'uint256', name: '' }],
      name: 'requiredSignatures',
      inputs: [],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'address', name: '' }],
      name: 'owner',
      inputs: [],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'uint256', name: '' }],
      name: 'deployedAtBlock',
      inputs: [],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      payable: false,
      outputs: [],
      name: 'transferOwnership',
      inputs: [{ type: 'address', name: 'newOwner' }],
      constant: false
    },
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'bool', name: '' }],
      name: 'validators',
      inputs: [{ type: 'address', name: '_validator' }],
      constant: true
    },
    {
      type: 'function',
      stateMutability: 'view',
      payable: false,
      outputs: [{ type: 'bool', name: '' }],
      name: 'isValidator',
      inputs: [{ type: 'address', name: '_validator' }],
      constant: true
    },
    {
      type: 'event',
      name: 'ValidatorAdded',
      inputs: [{ type: 'address', name: 'validator', indexed: true }],
      anonymous: false
    },
    {
      type: 'event',
      name: 'ValidatorRemoved',
      inputs: [{ type: 'address', name: 'validator', indexed: true }],
      anonymous: false
    },
    {
      type: 'event',
      name: 'RequiredSignaturesChanged',
      inputs: [{ type: 'uint256', name: 'requiredSignatures', indexed: false }],
      anonymous: false
    },
    {
      type: 'event',
      name: 'EternalOwnershipTransferred',
      inputs: [
        { type: 'address', name: 'previousOwner', indexed: false },
        { type: 'address', name: 'newOwner', indexed: false }
      ],
      anonymous: false
    }
  ],
  AMB: [
    {
      constant: true,
      inputs: [],
      name: 'validatorCount',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getBridgeValidatorsInterfacesVersion',
      outputs: [
        {
          name: 'major',
          type: 'uint64'
        },
        {
          name: 'minor',
          type: 'uint64'
        },
        {
          name: 'patch',
          type: 'uint64'
        }
      ],
      payable: false,
      stateMutability: 'pure',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isInitialized',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'validatorList',
      outputs: [
        {
          name: '',
          type: 'address[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_requiredSignatures',
          type: 'uint256'
        }
      ],
      name: 'setRequiredSignatures',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'requiredSignatures',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_address',
          type: 'address'
        }
      ],
      name: 'getNextValidator',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_validator',
          type: 'address'
        }
      ],
      name: 'isValidatorDuty',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'deployedAtBlock',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'F_ADDR',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_validator',
          type: 'address'
        }
      ],
      name: 'isValidator',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'validator',
          type: 'address'
        }
      ],
      name: 'ValidatorAdded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'validator',
          type: 'address'
        }
      ],
      name: 'ValidatorRemoved',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'requiredSignatures',
          type: 'uint256'
        }
      ],
      name: 'RequiredSignaturesChanged',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: false,
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_requiredSignatures',
          type: 'uint256'
        },
        {
          name: '_initialValidators',
          type: 'address[]'
        },
        {
          name: '_owner',
          type: 'address'
        }
      ],
      name: 'initialize',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_validator',
          type: 'address'
        }
      ],
      name: 'addValidator',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_validator',
          type: 'address'
        }
      ],
      name: 'removeValidator',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
}

export default abi
