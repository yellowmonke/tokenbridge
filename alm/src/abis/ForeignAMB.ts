import { AbiItem } from 'web3-utils'

interface AbiItems extends Array<AbiItem> {}

export const abi: { [key: string]: AbiItems } = {
  NATIVE: [
    {
      constant: true,
      inputs: [],
      name: 'erc677token',
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
          name: '_txHash',
          type: 'bytes32'
        }
      ],
      name: 'relayedMessages',
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
      inputs: [
        {
          name: '_day',
          type: 'uint256'
        }
      ],
      name: 'totalSpentPerDay',
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
      constant: false,
      inputs: [
        {
          name: '_fee',
          type: 'uint256'
        }
      ],
      name: 'setHomeFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
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
      constant: false,
      inputs: [
        {
          name: '_dailyLimit',
          type: 'uint256'
        }
      ],
      name: 'setExecutionDailyLimit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCurrentDay',
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
      name: 'requiredBlockConfirmations',
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
      constant: false,
      inputs: [
        {
          name: 'message',
          type: 'bytes'
        },
        {
          name: 'signatures',
          type: 'bytes'
        }
      ],
      name: 'executeSignatures',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'executionDailyLimit',
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
          name: '_day',
          type: 'uint256'
        }
      ],
      name: 'totalExecutedPerDay',
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
      constant: false,
      inputs: [
        {
          name: '_feeManager',
          type: 'address'
        }
      ],
      name: 'setFeeManagerContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'dailyLimit',
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
      constant: false,
      inputs: [
        {
          name: '_token',
          type: 'address'
        },
        {
          name: '_to',
          type: 'address'
        }
      ],
      name: 'claimTokens',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_amount',
          type: 'uint256'
        }
      ],
      name: 'withinExecutionLimit',
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
      name: 'executionMaxPerTx',
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
      inputs: [],
      name: 'getHomeFee',
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
      name: 'maxAvailablePerTx',
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
      name: 'validatorContract',
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
      name: 'getBridgeInterfacesVersion',
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
      constant: false,
      inputs: [
        {
          name: '_minPerTx',
          type: 'uint256'
        }
      ],
      name: 'setMinPerTx',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_from',
          type: 'address'
        },
        {
          name: '_value',
          type: 'uint256'
        },
        {
          name: '_data',
          type: 'bytes'
        }
      ],
      name: 'onTokenTransfer',
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
          name: '_blockConfirmations',
          type: 'uint256'
        }
      ],
      name: 'setRequiredBlockConfirmations',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_dailyLimit',
          type: 'uint256'
        }
      ],
      name: 'setDailyLimit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_gasPrice',
          type: 'uint256'
        }
      ],
      name: 'setGasPrice',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_maxPerTx',
          type: 'uint256'
        }
      ],
      name: 'setMaxPerTx',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimalShift',
      outputs: [
        {
          name: '',
          type: 'int256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'feeManagerContract',
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
      name: 'minPerTx',
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
          name: '_amount',
          type: 'uint256'
        }
      ],
      name: 'withinLimit',
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
      constant: false,
      inputs: [
        {
          name: '_maxPerTx',
          type: 'uint256'
        }
      ],
      name: 'setExecutionMaxPerTx',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getFeeManagerMode',
      outputs: [
        {
          name: '',
          type: 'bytes4'
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
      inputs: [],
      name: 'maxPerTx',
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
      name: 'gasPrice',
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'feeAmount',
          type: 'uint256'
        },
        {
          indexed: true,
          name: 'transactionHash',
          type: 'bytes32'
        }
      ],
      name: 'FeeDistributedFromAffirmation',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'feeAmount',
          type: 'uint256'
        },
        {
          indexed: true,
          name: 'transactionHash',
          type: 'bytes32'
        }
      ],
      name: 'FeeDistributedFromSignatures',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'recipient',
          type: 'address'
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256'
        },
        {
          indexed: false,
          name: 'transactionHash',
          type: 'bytes32'
        }
      ],
      name: 'RelayedMessage',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'recipient',
          type: 'address'
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'UserRequestForAffirmation',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'newLimit',
          type: 'uint256'
        }
      ],
      name: 'DailyLimitChanged',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'newLimit',
          type: 'uint256'
        }
      ],
      name: 'ExecutionDailyLimitChanged',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'gasPrice',
          type: 'uint256'
        }
      ],
      name: 'GasPriceChanged',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'requiredBlockConfirmations',
          type: 'uint256'
        }
      ],
      name: 'RequiredBlockConfirmationChanged',
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
          name: '_validatorContract',
          type: 'address'
        },
        {
          name: '_erc677token',
          type: 'address'
        },
        {
          name: '_dailyLimitMaxPerTxMinPerTxArray',
          type: 'uint256[3]'
        },
        {
          name: '_foreignGasPrice',
          type: 'uint256'
        },
        {
          name: '_requiredBlockConfirmations',
          type: 'uint256'
        },
        {
          name: '_homeDailyLimitHomeMaxPerTxArray',
          type: 'uint256[2]'
        },
        {
          name: '_owner',
          type: 'address'
        },
        {
          name: '_decimalShift',
          type: 'int256'
        },
        {
          name: '_bridgeOnOtherSide',
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
          name: '_validatorContract',
          type: 'address'
        },
        {
          name: '_erc677token',
          type: 'address'
        },
        {
          name: '_dailyLimitMaxPerTxMinPerTxArray',
          type: 'uint256[3]'
        },
        {
          name: '_foreignGasPrice',
          type: 'uint256'
        },
        {
          name: '_requiredBlockConfirmations',
          type: 'uint256'
        },
        {
          name: '_homeDailyLimitHomeMaxPerTxArray',
          type: 'uint256[2]'
        },
        {
          name: '_owner',
          type: 'address'
        },
        {
          name: '_feeManager',
          type: 'address'
        },
        {
          name: '_homeFee',
          type: 'uint256'
        },
        {
          name: '_decimalShift',
          type: 'int256'
        },
        {
          name: '_bridgeOnOtherSide',
          type: 'address'
        }
      ],
      name: 'rewardableInitialize',
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
      constant: true,
      inputs: [],
      name: 'getBridgeMode',
      outputs: [
        {
          name: '_data',
          type: 'bytes4'
        }
      ],
      payable: false,
      stateMutability: 'pure',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_token',
          type: 'address'
        },
        {
          name: '_to',
          type: 'address'
        }
      ],
      name: 'claimTokensFromErc677',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ],
  AMB: [
    {
      constant: true,
      inputs: [],
      name: 'transactionHash',
      outputs: [
        {
          name: '',
          type: 'bytes32'
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
          name: '_txHash',
          type: 'bytes32'
        }
      ],
      name: 'relayedMessages',
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
      constant: false,
      inputs: [
        {
          name: '_sourceChainId',
          type: 'uint256'
        },
        {
          name: '_destinationChainId',
          type: 'uint256'
        },
        {
          name: '_validatorContract',
          type: 'address'
        },
        {
          name: '_maxGasPerTx',
          type: 'uint256'
        },
        {
          name: '_gasPrice',
          type: 'uint256'
        },
        {
          name: '_requiredBlockConfirmations',
          type: 'uint256'
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
      name: 'requiredBlockConfirmations',
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
      constant: false,
      inputs: [
        {
          name: '_data',
          type: 'bytes'
        },
        {
          name: '_signatures',
          type: 'bytes'
        }
      ],
      name: 'executeSignatures',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_data',
          type: 'bytes'
        }
      ],
      name: 'getMinimumGasUsage',
      outputs: [
        {
          name: 'gas',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'pure',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_messageId',
          type: 'bytes32'
        }
      ],
      name: 'failedMessageReceiver',
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
      name: 'getBridgeMode',
      outputs: [
        {
          name: '_data',
          type: 'bytes4'
        }
      ],
      payable: false,
      stateMutability: 'pure',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_sourceChainId',
          type: 'uint256'
        },
        {
          name: '_destinationChainId',
          type: 'uint256'
        }
      ],
      name: 'setChainIds',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_messageId',
          type: 'bytes32'
        }
      ],
      name: 'failedMessageSender',
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
      name: 'messageId',
      outputs: [
        {
          name: '',
          type: 'bytes32'
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
          name: '_token',
          type: 'address'
        },
        {
          name: '_to',
          type: 'address'
        }
      ],
      name: 'claimTokens',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_maxGasPerTx',
          type: 'uint256'
        }
      ],
      name: 'setMaxGasPerTx',
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
      inputs: [],
      name: 'validatorContract',
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
      name: 'getBridgeInterfacesVersion',
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
      name: 'messageSourceChainId',
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
      constant: false,
      inputs: [
        {
          name: '_blockConfirmations',
          type: 'uint256'
        }
      ],
      name: 'setRequiredBlockConfirmations',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_gasPrice',
          type: 'uint256'
        }
      ],
      name: 'setGasPrice',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_messageId',
          type: 'bytes32'
        }
      ],
      name: 'messageCallStatus',
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
      name: 'messageSender',
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
          name: '_contract',
          type: 'address'
        },
        {
          name: '_data',
          type: 'bytes'
        },
        {
          name: '_gas',
          type: 'uint256'
        }
      ],
      name: 'requireToPassMessage',
      outputs: [
        {
          name: '',
          type: 'bytes32'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_messageId',
          type: 'bytes32'
        }
      ],
      name: 'failedMessageDataHash',
      outputs: [
        {
          name: '',
          type: 'bytes32'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'maxGasPerTx',
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
      inputs: [],
      name: 'gasPrice',
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
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'messageId',
          type: 'bytes32'
        },
        {
          indexed: false,
          name: 'encodedData',
          type: 'bytes'
        }
      ],
      name: 'UserRequestForAffirmation',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'sender',
          type: 'address'
        },
        {
          indexed: true,
          name: 'executor',
          type: 'address'
        },
        {
          indexed: true,
          name: 'messageId',
          type: 'bytes32'
        },
        {
          indexed: false,
          name: 'status',
          type: 'bool'
        }
      ],
      name: 'RelayedMessage',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'gasPrice',
          type: 'uint256'
        }
      ],
      name: 'GasPriceChanged',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'requiredBlockConfirmations',
          type: 'uint256'
        }
      ],
      name: 'RequiredBlockConfirmationChanged',
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
    }
  ]
}

// export default abi
