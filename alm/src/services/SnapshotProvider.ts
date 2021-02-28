const initialValue = {
  chainId: 0,
  RequiredBlockConfirmationChanged: [],
  RequiredSignaturesChanged: [],
  ValidatorAdded: [],
  ValidatorRemoved: [],
  snapshotBlockNumber: 0
}

export interface SnapshotEvent {
  blockNumber: number
  returnValues: any
}

export interface SnapshotValidatorEvent {
  blockNumber: number
  returnValues: any
  event: string
}

export interface Snapshot {
  chainId: number
  RequiredBlockConfirmationChanged: SnapshotEvent[]
  RequiredSignaturesChanged: SnapshotEvent[]
  ValidatorAdded: SnapshotValidatorEvent[]
  ValidatorRemoved: SnapshotValidatorEvent[]
  snapshotBlockNumber: number
}

export class SnapshotProvider {
  private data: Snapshot

  constructor(side: string) {
    let data = initialValue
    try {
      data = require(`../snapshots/${side}.json`)
    } catch (e) {
      console.log('Snapshot not found')
    }
    this.data = data
  }

  chainId() {
    return this.data.chainId
  }

  snapshotBlockNumber() {
    return this.data.snapshotBlockNumber
  }

  requiredBlockConfirmationEvents(toBlock: number) {
    return this.data.RequiredBlockConfirmationChanged.filter(e => e.blockNumber <= toBlock)
  }

  requiredSignaturesEvents(toBlock: number) {
    return this.data.RequiredSignaturesChanged.filter(e => e.blockNumber <= toBlock)
  }

  validatorAddedEvents(fromBlock: number) {
    return this.data.ValidatorAdded.filter(e => e.blockNumber >= fromBlock)
  }

  validatorRemovedEvents(fromBlock: number) {
    return this.data.ValidatorRemoved.filter(e => e.blockNumber >= fromBlock)
  }
}

export const homeAMBSnapshotProvider = new SnapshotProvider('homeAMB')
export const foreignAMBSnapshotProvider = new SnapshotProvider('foreignAMB')

export const homeNativeSnapshotProvider = new SnapshotProvider('homeNATIVE')
export const foreignNativeSnapshotProvider = new SnapshotProvider('foreignNATIVE')
