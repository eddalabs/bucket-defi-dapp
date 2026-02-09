import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.14.0');

export var BucketDEFI_STATUS;
(function (BucketDEFI_STATUS) {
  BucketDEFI_STATUS[BucketDEFI_STATUS['OPEN'] = 0] = 'OPEN';
  BucketDEFI_STATUS[BucketDEFI_STATUS['SETTLED'] = 1] = 'SETTLED';
  BucketDEFI_STATUS[BucketDEFI_STATUS['CLAIMED'] = 2] = 'CLAIMED';
})(BucketDEFI_STATUS || (BucketDEFI_STATUS = {}));

export var NonFungibleToken_Location;
(function (NonFungibleToken_Location) {
  NonFungibleToken_Location[NonFungibleToken_Location['RJ'] = 0] = 'RJ';
  NonFungibleToken_Location[NonFungibleToken_Location['SP'] = 1] = 'SP';
  NonFungibleToken_Location[NonFungibleToken_Location['MG'] = 2] = 'MG';
  NonFungibleToken_Location[NonFungibleToken_Location['RS'] = 3] = 'RS';
})(NonFungibleToken_Location || (NonFungibleToken_Location = {}));

export var NonFungibleToken_Impact;
(function (NonFungibleToken_Impact) {
  NonFungibleToken_Impact[NonFungibleToken_Impact['Minimal'] = 0] = 'Minimal';
  NonFungibleToken_Impact[NonFungibleToken_Impact['Low'] = 1] = 'Low';
  NonFungibleToken_Impact[NonFungibleToken_Impact['Medium'] = 2] = 'Medium';
  NonFungibleToken_Impact[NonFungibleToken_Impact['High'] = 3] = 'High';
  NonFungibleToken_Impact[NonFungibleToken_Impact['Extreme'] = 4] = 'Extreme';
})(NonFungibleToken_Impact || (NonFungibleToken_Impact = {}));

export var NonFungibleToken_Source;
(function (NonFungibleToken_Source) {
  NonFungibleToken_Source[NonFungibleToken_Source['Solar'] = 0] = 'Solar';
  NonFungibleToken_Source[NonFungibleToken_Source['Wind'] = 1] = 'Wind';
  NonFungibleToken_Source[NonFungibleToken_Source['Hydro'] = 2] = 'Hydro';
  NonFungibleToken_Source[NonFungibleToken_Source['Biomass'] = 3] = 'Biomass';
  NonFungibleToken_Source[NonFungibleToken_Source['Geothermal'] = 4] = 'Geothermal';
  NonFungibleToken_Source[NonFungibleToken_Source['Nuclear'] = 5] = 'Nuclear';
})(NonFungibleToken_Source || (NonFungibleToken_Source = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_3 = new __compactRuntime.CompactTypeEnum(5, 1);

const _descriptor_4 = new __compactRuntime.CompactTypeEnum(4, 1);

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(3, 1);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(2, 1);

class _CONDITIONS_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment())))))))));
  }
  fromValue(value_0) {
    return {
      source: _descriptor_3.fromValue(value_0),
      unitPrice: _descriptor_2.fromValue(value_0),
      vintageLimit: _descriptor_2.fromValue(value_0),
      impact: _descriptor_4.fromValue(value_0),
      location: _descriptor_5.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0),
      accumulatedPrice: _descriptor_1.fromValue(value_0),
      pot: _descriptor_1.fromValue(value_0),
      startDate: _descriptor_2.fromValue(value_0),
      endDate: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.source).concat(_descriptor_2.toValue(value_0.unitPrice).concat(_descriptor_2.toValue(value_0.vintageLimit).concat(_descriptor_4.toValue(value_0.impact).concat(_descriptor_5.toValue(value_0.location).concat(_descriptor_6.toValue(value_0.status).concat(_descriptor_1.toValue(value_0.accumulatedPrice).concat(_descriptor_1.toValue(value_0.pot).concat(_descriptor_2.toValue(value_0.startDate).concat(_descriptor_2.toValue(value_0.endDate))))))))));
  }
}

const _descriptor_7 = new _CONDITIONS_0();

const _descriptor_8 = __compactRuntime.CompactTypeBoolean;

const _descriptor_9 = __compactRuntime.CompactTypeOpaqueString;

class _Certificate_0 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment())))));
  }
  fromValue(value_0) {
    return {
      id: _descriptor_9.fromValue(value_0),
      source: _descriptor_3.fromValue(value_0),
      generation: _descriptor_2.fromValue(value_0),
      vintage: _descriptor_2.fromValue(value_0),
      impact: _descriptor_4.fromValue(value_0),
      location: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.id).concat(_descriptor_3.toValue(value_0.source).concat(_descriptor_2.toValue(value_0.generation).concat(_descriptor_2.toValue(value_0.vintage).concat(_descriptor_4.toValue(value_0.impact).concat(_descriptor_5.toValue(value_0.location))))));
  }
}

const _descriptor_10 = new _Certificate_0();

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_1.toValue(value_0.value)));
  }
}

const _descriptor_11 = new _ShieldedCoinInfo_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_12 = new _ZswapCoinPublicKey_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_13 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_12.alignment().concat(_descriptor_13.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_8.fromValue(value_0),
      left: _descriptor_12.fromValue(value_0),
      right: _descriptor_13.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.is_left).concat(_descriptor_12.toValue(value_0.left).concat(_descriptor_13.toValue(value_0.right)));
  }
}

const _descriptor_14 = new _Either_0();

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_1.fromValue(value_0),
      mt_index: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_1.toValue(value_0.value).concat(_descriptor_2.toValue(value_0.mt_index))));
  }
}

const _descriptor_15 = new _QualifiedShieldedCoinInfo_0();

const _descriptor_16 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _Maybe_0 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_11.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_8.fromValue(value_0),
      value: _descriptor_11.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.is_some).concat(_descriptor_11.toValue(value_0.value));
  }
}

const _descriptor_17 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_17.alignment().concat(_descriptor_11.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_17.fromValue(value_0),
      sent: _descriptor_11.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_17.toValue(value_0.change).concat(_descriptor_11.toValue(value_0.sent));
  }
}

const _descriptor_18 = new _ShieldedSendResult_0();

const _descriptor_19 = __compactRuntime.CompactTypeField;

const _descriptor_20 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_21 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

const _descriptor_22 = new __compactRuntime.CompactTypeVector(2, _descriptor_19);

const _descriptor_23 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_23.alignment().concat(_descriptor_11.alignment().concat(_descriptor_8.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_23.fromValue(value_0),
      info: _descriptor_11.fromValue(value_0),
      dataType: _descriptor_8.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_23.toValue(value_0.domain_sep).concat(_descriptor_11.toValue(value_0.info).concat(_descriptor_8.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
}

const _descriptor_24 = new _CoinPreimage_0();

class _Either_1 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_8.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_25 = new _Either_1();

const _descriptor_26 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.wit_secretNonce) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named wit_secretNonce');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      grantRole: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`grantRole: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const roleId_0 = args_1[1];
        const account_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('grantRole',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 104 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(roleId_0.buffer instanceof ArrayBuffer && roleId_0.BYTES_PER_ELEMENT === 1 && roleId_0.length === 32)) {
          __compactRuntime.typeError('grantRole',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 104 char 1',
                                     'Bytes<32>',
                                     roleId_0)
        }
        if (!(typeof(account_0) === 'object' && typeof(account_0.is_left) === 'boolean' && typeof(account_0.left) === 'object' && account_0.left.bytes.buffer instanceof ArrayBuffer && account_0.left.bytes.BYTES_PER_ELEMENT === 1 && account_0.left.bytes.length === 32 && typeof(account_0.right) === 'object' && account_0.right.bytes.buffer instanceof ArrayBuffer && account_0.right.bytes.BYTES_PER_ELEMENT === 1 && account_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('grantRole',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 104 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     account_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(roleId_0).concat(_descriptor_14.toValue(account_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_14.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._grantRole_1(context,
                                           partialProofData,
                                           roleId_0,
                                           account_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      revokeRole: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`revokeRole: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const roleId_0 = args_1[1];
        const account_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('revokeRole',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 119 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(roleId_0.buffer instanceof ArrayBuffer && roleId_0.BYTES_PER_ELEMENT === 1 && roleId_0.length === 32)) {
          __compactRuntime.typeError('revokeRole',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 119 char 1',
                                     'Bytes<32>',
                                     roleId_0)
        }
        if (!(typeof(account_0) === 'object' && typeof(account_0.is_left) === 'boolean' && typeof(account_0.left) === 'object' && account_0.left.bytes.buffer instanceof ArrayBuffer && account_0.left.bytes.BYTES_PER_ELEMENT === 1 && account_0.left.bytes.length === 32 && typeof(account_0.right) === 'object' && account_0.right.bytes.buffer instanceof ArrayBuffer && account_0.right.bytes.BYTES_PER_ELEMENT === 1 && account_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('revokeRole',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 119 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     account_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(roleId_0).concat(_descriptor_14.toValue(account_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_14.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._revokeRole_1(context,
                                            partialProofData,
                                            roleId_0,
                                            account_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      renounceRole: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`renounceRole: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const roleId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('renounceRole',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 133 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(roleId_0.buffer instanceof ArrayBuffer && roleId_0.BYTES_PER_ELEMENT === 1 && roleId_0.length === 32)) {
          __compactRuntime.typeError('renounceRole',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 133 char 1',
                                     'Bytes<32>',
                                     roleId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(roleId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._renounceRole_1(context,
                                              partialProofData,
                                              roleId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setRoleAdmin: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`setRoleAdmin: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const roleId_0 = args_1[1];
        const adminRole_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setRoleAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 147 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(roleId_0.buffer instanceof ArrayBuffer && roleId_0.BYTES_PER_ELEMENT === 1 && roleId_0.length === 32)) {
          __compactRuntime.typeError('setRoleAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 147 char 1',
                                     'Bytes<32>',
                                     roleId_0)
        }
        if (!(adminRole_0.buffer instanceof ArrayBuffer && adminRole_0.BYTES_PER_ELEMENT === 1 && adminRole_0.length === 32)) {
          __compactRuntime.typeError('setRoleAdmin',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 147 char 1',
                                     'Bytes<32>',
                                     adminRole_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(roleId_0).concat(_descriptor_0.toValue(adminRole_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setRoleAdmin_1(context,
                                              partialProofData,
                                              roleId_0,
                                              adminRole_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeRoleAdmin: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`removeRoleAdmin: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const roleId_0 = args_1[1];
        const adminRole_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeRoleAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 161 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(roleId_0.buffer instanceof ArrayBuffer && roleId_0.BYTES_PER_ELEMENT === 1 && roleId_0.length === 32)) {
          __compactRuntime.typeError('removeRoleAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 161 char 1',
                                     'Bytes<32>',
                                     roleId_0)
        }
        if (!(adminRole_0.buffer instanceof ArrayBuffer && adminRole_0.BYTES_PER_ELEMENT === 1 && adminRole_0.length === 32)) {
          __compactRuntime.typeError('removeRoleAdmin',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 161 char 1',
                                     'Bytes<32>',
                                     adminRole_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(roleId_0).concat(_descriptor_0.toValue(adminRole_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeRoleAdmin_1(context,
                                                 partialProofData,
                                                 roleId_0,
                                                 adminRole_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      assertOnlyRole: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`assertOnlyRole: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const roleId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('assertOnlyRole',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 175 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(roleId_0.buffer instanceof ArrayBuffer && roleId_0.BYTES_PER_ELEMENT === 1 && roleId_0.length === 32)) {
          __compactRuntime.typeError('assertOnlyRole',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 175 char 1',
                                     'Bytes<32>',
                                     roleId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(roleId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._assertOnlyRole_1(context,
                                                partialProofData,
                                                roleId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      pauseAccessControl: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`pauseAccessControl: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('pauseAccessControl',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 190 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._pauseAccessControl_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      unpauseAccessControl: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`unpauseAccessControl: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('unpauseAccessControl',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 205 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unpauseAccessControl_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      assertOwnVerification: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`assertOwnVerification: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('assertOwnVerification',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 222 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._assertOwnVerification_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      isUserVerified: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isUserVerified: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const user_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('isUserVerified',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 236 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(user_0) === 'object' && user_0.bytes.buffer instanceof ArrayBuffer && user_0.bytes.BYTES_PER_ELEMENT === 1 && user_0.bytes.length === 32)) {
          __compactRuntime.typeError('isUserVerified',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 236 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     user_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_12.toValue(user_0),
            alignment: _descriptor_12.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isUserVerified_1(context,
                                                partialProofData,
                                                user_0);
        partialProofData.output = { value: _descriptor_8.toValue(result_0), alignment: _descriptor_8.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setUser: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setUser: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const user_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setUser',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 253 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(user_0) === 'object' && user_0.bytes.buffer instanceof ArrayBuffer && user_0.bytes.BYTES_PER_ELEMENT === 1 && user_0.bytes.length === 32)) {
          __compactRuntime.typeError('setUser',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 253 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     user_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_12.toValue(user_0),
            alignment: _descriptor_12.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setUser_1(context, partialProofData, user_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeUser: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeUser: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const user_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeUser',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 271 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(user_0) === 'object' && user_0.bytes.buffer instanceof ArrayBuffer && user_0.bytes.BYTES_PER_ELEMENT === 1 && user_0.bytes.length === 32)) {
          __compactRuntime.typeError('removeUser',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 271 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     user_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_12.toValue(user_0),
            alignment: _descriptor_12.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeUser_1(context, partialProofData, user_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      pauseIdentity: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`pauseIdentity: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('pauseIdentity',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 288 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._pauseIdentity_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      unpauseIdentity: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`unpauseIdentity: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('unpauseIdentity',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 305 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unpauseIdentity_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      balanceOf: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`balanceOf: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const owner_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('balanceOf',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 324 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(owner_0) === 'object' && typeof(owner_0.is_left) === 'boolean' && typeof(owner_0.left) === 'object' && owner_0.left.bytes.buffer instanceof ArrayBuffer && owner_0.left.bytes.BYTES_PER_ELEMENT === 1 && owner_0.left.bytes.length === 32 && typeof(owner_0.right) === 'object' && owner_0.right.bytes.buffer instanceof ArrayBuffer && owner_0.right.bytes.BYTES_PER_ELEMENT === 1 && owner_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('balanceOf',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 324 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     owner_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_14.toValue(owner_0),
            alignment: _descriptor_14.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._balanceOf_1(context, partialProofData, owner_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      ownerOf: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`ownerOf: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('ownerOf',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 338 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('ownerOf',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 338 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(tokenId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._ownerOf_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: _descriptor_14.toValue(result_0), alignment: _descriptor_14.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      tokenCertificate: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`tokenCertificate: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('tokenCertificate',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 352 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('tokenCertificate',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 352 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(tokenId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._tokenCertificate_1(context,
                                                  partialProofData,
                                                  tokenId_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      tokenPrice: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`tokenPrice: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('tokenPrice',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 366 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('tokenPrice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 366 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(tokenId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._tokenPrice_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      mint: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`mint: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const to_0 = args_1[1];
        const tokenId_0 = args_1[2];
        const tokenCertificate_0 = args_1[3];
        const price_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('mint',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 383 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(to_0) === 'object' && typeof(to_0.is_left) === 'boolean' && typeof(to_0.left) === 'object' && to_0.left.bytes.buffer instanceof ArrayBuffer && to_0.left.bytes.BYTES_PER_ELEMENT === 1 && to_0.left.bytes.length === 32 && typeof(to_0.right) === 'object' && to_0.right.bytes.buffer instanceof ArrayBuffer && to_0.right.bytes.BYTES_PER_ELEMENT === 1 && to_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('mint',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 383 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     to_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('mint',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 383 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        if (!(typeof(tokenCertificate_0) === 'object' && true && typeof(tokenCertificate_0.source) === 'number' && tokenCertificate_0.source >= 0 && tokenCertificate_0.source <= 5 && typeof(tokenCertificate_0.generation) === 'bigint' && tokenCertificate_0.generation >= 0n && tokenCertificate_0.generation <= 18446744073709551615n && typeof(tokenCertificate_0.vintage) === 'bigint' && tokenCertificate_0.vintage >= 0n && tokenCertificate_0.vintage <= 18446744073709551615n && typeof(tokenCertificate_0.impact) === 'number' && tokenCertificate_0.impact >= 0 && tokenCertificate_0.impact <= 4 && typeof(tokenCertificate_0.location) === 'number' && tokenCertificate_0.location >= 0 && tokenCertificate_0.location <= 3)) {
          __compactRuntime.typeError('mint',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'bucket-defi.compact line 383 char 1',
                                     'struct Certificate<id: Opaque<"string">, source: Enum<Source, Solar, Wind, Hydro, Biomass, Geothermal, Nuclear>, generation: Uint<0..18446744073709551616>, vintage: Uint<0..18446744073709551616>, impact: Enum<Impact, Minimal, Low, Medium, High, Extreme>, location: Enum<Location, RJ, SP, MG, RS>>',
                                     tokenCertificate_0)
        }
        if (!(typeof(price_0) === 'bigint' && price_0 >= 0n && price_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('mint',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'bucket-defi.compact line 383 char 1',
                                     'Uint<0..18446744073709551616>',
                                     price_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_14.toValue(to_0).concat(_descriptor_1.toValue(tokenId_0).concat(_descriptor_10.toValue(tokenCertificate_0).concat(_descriptor_2.toValue(price_0)))),
            alignment: _descriptor_14.alignment().concat(_descriptor_1.alignment().concat(_descriptor_10.alignment().concat(_descriptor_2.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._mint_1(context,
                                      partialProofData,
                                      to_0,
                                      tokenId_0,
                                      tokenCertificate_0,
                                      price_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      burn: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`burn: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('burn',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 403 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('burn',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 403 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(tokenId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._burn_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setTokenPrice: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`setTokenPrice: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        const price_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setTokenPrice',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 421 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('setTokenPrice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 421 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        if (!(typeof(price_0) === 'bigint' && price_0 >= 0n && price_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('setTokenPrice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 421 char 1',
                                     'Uint<0..18446744073709551616>',
                                     price_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(tokenId_0).concat(_descriptor_2.toValue(price_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_2.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setTokenPrice_1(context,
                                               partialProofData,
                                               tokenId_0,
                                               price_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      pauseToken: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`pauseToken: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('pauseToken',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 437 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._pauseToken_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      unpauseToken: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`unpauseToken: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('unpauseToken',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 454 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unpauseToken_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      createBucket: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`createBucket: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const conditions_0 = args_1[1];
        const coin_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createBucket',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 475 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(conditions_0) === 'object' && typeof(conditions_0.source) === 'number' && conditions_0.source >= 0 && conditions_0.source <= 5 && typeof(conditions_0.unitPrice) === 'bigint' && conditions_0.unitPrice >= 0n && conditions_0.unitPrice <= 18446744073709551615n && typeof(conditions_0.vintageLimit) === 'bigint' && conditions_0.vintageLimit >= 0n && conditions_0.vintageLimit <= 18446744073709551615n && typeof(conditions_0.impact) === 'number' && conditions_0.impact >= 0 && conditions_0.impact <= 4 && typeof(conditions_0.location) === 'number' && conditions_0.location >= 0 && conditions_0.location <= 3 && typeof(conditions_0.status) === 'number' && conditions_0.status >= 0 && conditions_0.status <= 2 && typeof(conditions_0.accumulatedPrice) === 'bigint' && conditions_0.accumulatedPrice >= 0n && conditions_0.accumulatedPrice <= 340282366920938463463374607431768211455n && typeof(conditions_0.pot) === 'bigint' && conditions_0.pot >= 0n && conditions_0.pot <= 340282366920938463463374607431768211455n && typeof(conditions_0.startDate) === 'bigint' && conditions_0.startDate >= 0n && conditions_0.startDate <= 18446744073709551615n && typeof(conditions_0.endDate) === 'bigint' && conditions_0.endDate >= 0n && conditions_0.endDate <= 18446744073709551615n)) {
          __compactRuntime.typeError('createBucket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 475 char 1',
                                     'struct CONDITIONS<source: Enum<Source, Solar, Wind, Hydro, Biomass, Geothermal, Nuclear>, unitPrice: Uint<0..18446744073709551616>, vintageLimit: Uint<0..18446744073709551616>, impact: Enum<Impact, Minimal, Low, Medium, High, Extreme>, location: Enum<Location, RJ, SP, MG, RS>, status: Enum<STATUS, OPEN, SETTLED, CLAIMED>, accumulatedPrice: Uint<0..340282366920938463463374607431768211456>, pot: Uint<0..340282366920938463463374607431768211456>, startDate: Uint<0..18446744073709551616>, endDate: Uint<0..18446744073709551616>>',
                                     conditions_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('createBucket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 475 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(conditions_0).concat(_descriptor_11.toValue(coin_0)),
            alignment: _descriptor_7.alignment().concat(_descriptor_11.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createBucket_1(context,
                                              partialProofData,
                                              conditions_0,
                                              coin_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addCertificateToBucket: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`addCertificateToBucket: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerCommitment_0 = args_1[1];
        const tokenId_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('addCertificateToBucket',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 495 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerCommitment_0.buffer instanceof ArrayBuffer && ownerCommitment_0.BYTES_PER_ELEMENT === 1 && ownerCommitment_0.length === 32)) {
          __compactRuntime.typeError('addCertificateToBucket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 495 char 1',
                                     'Bytes<32>',
                                     ownerCommitment_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('addCertificateToBucket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 495 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerCommitment_0).concat(_descriptor_1.toValue(tokenId_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addCertificateToBucket_1(context,
                                                        partialProofData,
                                                        ownerCommitment_0,
                                                        tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      settleBucket: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`settleBucket: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerCommitment_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('settleBucket',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 537 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerCommitment_0.buffer instanceof ArrayBuffer && ownerCommitment_0.BYTES_PER_ELEMENT === 1 && ownerCommitment_0.length === 32)) {
          __compactRuntime.typeError('settleBucket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 537 char 1',
                                     'Bytes<32>',
                                     ownerCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerCommitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._settleBucket_1(context,
                                              partialProofData,
                                              ownerCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimCertificateReward: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`claimCertificateReward: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimCertificateReward',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 559 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('claimCertificateReward',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 559 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(tokenId_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimCertificateReward_1(context,
                                                        partialProofData,
                                                        tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdrawBucketLeftover: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdrawBucketLeftover: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerCommitment_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('withdrawBucketLeftover',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 583 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerCommitment_0.buffer instanceof ArrayBuffer && ownerCommitment_0.BYTES_PER_ELEMENT === 1 && ownerCommitment_0.length === 32)) {
          __compactRuntime.typeError('withdrawBucketLeftover',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 583 char 1',
                                     'Bytes<32>',
                                     ownerCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerCommitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawBucketLeftover_1(context,
                                                        partialProofData,
                                                        ownerCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      proofBucketOwnership: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`proofBucketOwnership: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerCommitment_0 = args_1[1];
        const challenge_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proofBucketOwnership',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 598 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerCommitment_0.buffer instanceof ArrayBuffer && ownerCommitment_0.BYTES_PER_ELEMENT === 1 && ownerCommitment_0.length === 32)) {
          __compactRuntime.typeError('proofBucketOwnership',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'bucket-defi.compact line 598 char 1',
                                     'Bytes<32>',
                                     ownerCommitment_0)
        }
        if (!(challenge_0.buffer instanceof ArrayBuffer && challenge_0.BYTES_PER_ELEMENT === 1 && challenge_0.length === 32)) {
          __compactRuntime.typeError('proofBucketOwnership',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'bucket-defi.compact line 598 char 1',
                                     'Bytes<32>',
                                     challenge_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerCommitment_0).concat(_descriptor_0.toValue(challenge_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proofBucketOwnership_1(context,
                                                      partialProofData,
                                                      ownerCommitment_0,
                                                      challenge_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      pauseBucketDEFI: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`pauseBucketDEFI: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('pauseBucketDEFI',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 614 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._pauseBucketDEFI_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      unpauseBucketDEFI: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`unpauseBucketDEFI: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('unpauseBucketDEFI',
                                     'argument 1 (as invoked from Typescript)',
                                     'bucket-defi.compact line 631 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unpauseBucketDEFI_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      grantRole: this.circuits.grantRole,
      revokeRole: this.circuits.revokeRole,
      renounceRole: this.circuits.renounceRole,
      setRoleAdmin: this.circuits.setRoleAdmin,
      removeRoleAdmin: this.circuits.removeRoleAdmin,
      assertOnlyRole: this.circuits.assertOnlyRole,
      pauseAccessControl: this.circuits.pauseAccessControl,
      unpauseAccessControl: this.circuits.unpauseAccessControl,
      assertOwnVerification: this.circuits.assertOwnVerification,
      isUserVerified: this.circuits.isUserVerified,
      setUser: this.circuits.setUser,
      removeUser: this.circuits.removeUser,
      pauseIdentity: this.circuits.pauseIdentity,
      unpauseIdentity: this.circuits.unpauseIdentity,
      balanceOf: this.circuits.balanceOf,
      ownerOf: this.circuits.ownerOf,
      tokenCertificate: this.circuits.tokenCertificate,
      tokenPrice: this.circuits.tokenPrice,
      mint: this.circuits.mint,
      burn: this.circuits.burn,
      setTokenPrice: this.circuits.setTokenPrice,
      pauseToken: this.circuits.pauseToken,
      unpauseToken: this.circuits.unpauseToken,
      createBucket: this.circuits.createBucket,
      addCertificateToBucket: this.circuits.addCertificateToBucket,
      settleBucket: this.circuits.settleBucket,
      claimCertificateReward: this.circuits.claimCertificateReward,
      withdrawBucketLeftover: this.circuits.withdrawBucketLeftover,
      proofBucketOwnership: this.circuits.proofBucketOwnership,
      pauseBucketDEFI: this.circuits.pauseBucketDEFI,
      unpauseBucketDEFI: this.circuits.unpauseBucketDEFI
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const _name_0 = args_0[1];
    const _symbol_0 = args_0[2];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_3 = __compactRuntime.StateValue.newArray();
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_3);
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('grantRole', new __compactRuntime.ContractOperation());
    state_0.setOperation('revokeRole', new __compactRuntime.ContractOperation());
    state_0.setOperation('renounceRole', new __compactRuntime.ContractOperation());
    state_0.setOperation('setRoleAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeRoleAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('assertOnlyRole', new __compactRuntime.ContractOperation());
    state_0.setOperation('pauseAccessControl', new __compactRuntime.ContractOperation());
    state_0.setOperation('unpauseAccessControl', new __compactRuntime.ContractOperation());
    state_0.setOperation('assertOwnVerification', new __compactRuntime.ContractOperation());
    state_0.setOperation('isUserVerified', new __compactRuntime.ContractOperation());
    state_0.setOperation('setUser', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeUser', new __compactRuntime.ContractOperation());
    state_0.setOperation('pauseIdentity', new __compactRuntime.ContractOperation());
    state_0.setOperation('unpauseIdentity', new __compactRuntime.ContractOperation());
    state_0.setOperation('balanceOf', new __compactRuntime.ContractOperation());
    state_0.setOperation('ownerOf', new __compactRuntime.ContractOperation());
    state_0.setOperation('tokenCertificate', new __compactRuntime.ContractOperation());
    state_0.setOperation('tokenPrice', new __compactRuntime.ContractOperation());
    state_0.setOperation('mint', new __compactRuntime.ContractOperation());
    state_0.setOperation('burn', new __compactRuntime.ContractOperation());
    state_0.setOperation('setTokenPrice', new __compactRuntime.ContractOperation());
    state_0.setOperation('pauseToken', new __compactRuntime.ContractOperation());
    state_0.setOperation('unpauseToken', new __compactRuntime.ContractOperation());
    state_0.setOperation('createBucket', new __compactRuntime.ContractOperation());
    state_0.setOperation('addCertificateToBucket', new __compactRuntime.ContractOperation());
    state_0.setOperation('settleBucket', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimCertificateReward', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdrawBucketLeftover', new __compactRuntime.ContractOperation());
    state_0.setOperation('proofBucketOwnership', new __compactRuntime.ContractOperation());
    state_0.setOperation('pauseBucketDEFI', new __compactRuntime.ContractOperation());
    state_0.setOperation('unpauseBucketDEFI', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(1n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(2n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(4n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(5n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(6n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(8n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(''),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(9n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(''),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(10n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(1n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(2n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(4n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(5n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(6n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(8n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(9n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(10n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(11n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(12n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(13n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(14n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(1n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(2n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(4n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(''),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(5n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(''),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(6n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(8n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(9n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(10n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(11n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(12n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(13n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(14n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    this._initialize_0(context, partialProofData);
    this._initialize_2(context, partialProofData);
    this._initialize_4(context, partialProofData, _name_0, _symbol_0);
    this._initialize_6(context, partialProofData);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_24, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_21, value_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _nativeToken_0() {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_12.toValue(result_0),
      alignment: _descriptor_12.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _shieldedBurnAddress_0() {
    return this._left_0({ bytes: new Uint8Array(32) });
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_26.toValue(0n),
                                                                                                                             alignment: _descriptor_26.alignment() } }] } },
                                                                                                  { popeq: { cached: true,
                                                                                                             result: undefined } }]).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_26.toValue(0n),
                                                                                                              alignment: _descriptor_26.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(input_0),
                                        selfAddr_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    let t_0;
    const change_0 = (t_0 = input_0.value,
                      (__compactRuntime.assert(t_0 >= value_0,
                                               'result of subtraction would be negative'),
                       t_0 - value_0));
    const output_0 = { nonce:
                         this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(28,
                                                                                                                  new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                                  '<standard library>'),
                                                                             this._degradeToTransient_0(input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (this._equal_0(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = { nonce:
                               this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(30,
                                                                                                                        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
                                                                                                                        '<standard library>'),
                                                                                   this._degradeToTransient_0(input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this._createZswapOutput_0(context,
                                partialProofData,
                                changeCoin_0,
                                this._right_0(selfAddr_0));
      const cm_0 = this._coinCommitment_0(changeCoin_0,
                                          this._right_0(selfAddr_0));
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(2n),
                                                                    alignment: _descriptor_26.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_0({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_0({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 110, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: false,
                                    data: addr_0.bytes });
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 2 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(2n),
                                                                                                 alignment: _descriptor_26.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(time_0),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _blockTimeGt_0(context, partialProofData, time_0) {
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(time_0),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      { dup: { n: 3 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(2n),
                                                                                                 alignment: _descriptor_26.alignment() } }] } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeLte_0(context, partialProofData, time_0) {
    return !this._blockTimeGt_0(context, partialProofData, time_0);
  }
  _initialize_0(context, partialProofData) {
    this._initialize_1(context, partialProofData);
    const tmp_0 = new Uint8Array(32);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(2n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    this.__grantRole_0(context,
                       partialProofData,
                       _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_26.toValue(0n),
                                                                                                             alignment: _descriptor_26.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_26.toValue(2n),
                                                                                                             alignment: _descriptor_26.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value),
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    const minterAdmin_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                    1n,
                                                                    'AccessControl.compact line 92 char 30');
    const minter_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                               2n,
                                                               'AccessControl.compact line 93 char 25');
    const matcherAdmin_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                     3n,
                                                                     'AccessControl.compact line 94 char 31');
    const matcher_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                4n,
                                                                'AccessControl.compact line 95 char 26');
    const settlerAdmin_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                     5n,
                                                                     'AccessControl.compact line 96 char 31');
    const settler_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                6n,
                                                                'AccessControl.compact line 97 char 26');
    const verifierAdmin_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                      7n,
                                                                      'AccessControl.compact line 98 char 32');
    const verifier_Role_0 = __compactRuntime.convertFieldToBytes(32,
                                                                 8n,
                                                                 'AccessControl.compact line 99 char 27');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(minter_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(minterAdmin_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(matcher_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(matcherAdmin_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(settler_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(settlerAdmin_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(verifier_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(verifierAdmin_Role_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    this.__grantRole_0(context,
                       partialProofData,
                       minter_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       matcher_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       settler_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       verifier_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       minterAdmin_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       matcherAdmin_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       settlerAdmin_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    this.__grantRole_0(context,
                       partialProofData,
                       verifierAdmin_Role_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    return [];
  }
  _grantRole_0(context, partialProofData, roleId_0, account_0) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    this.__assertOnlyRole_0(context,
                            partialProofData,
                            this.__getRoleAdmin_0(roleId_0));
    this.__grantRole_0(context, partialProofData, roleId_0, account_0);
    return [];
  }
  _revokeRole_0(context, partialProofData, roleId_0, account_0) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    this.__assertOnlyRole_0(context,
                            partialProofData,
                            this.__getRoleAdmin_0(roleId_0));
    this.__revokeRole_0(context, partialProofData, roleId_0, account_0);
    return [];
  }
  _renounceRole_0(context, partialProofData, roleId_0) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    const ownKey_0 = this._left_0(this._ownPublicKey_0(context, partialProofData));
    this.__revokeRole_0(context, partialProofData, roleId_0, ownKey_0);
    return [];
  }
  _setRoleAdmin_0(context, partialProofData, roleId_0, adminRole_0) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    this.__assertOnlyRole_0(context, partialProofData, new Uint8Array(32));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(adminRole_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _removeRoleAdmin_0(context, partialProofData, roleId_0, adminRole_0) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    this.__assertOnlyRole_0(context, partialProofData, new Uint8Array(32));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _assertOnlyRole_0(context, partialProofData, roleId_0) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    this.__checkRole_0(context,
                       partialProofData,
                       roleId_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    return [];
  }
  _pauseAccessControl_0(context, partialProofData) {
    this._assertInitialized_0(context, partialProofData);
    this._assertNotPaused_0(context, partialProofData);
    this.__assertOnlyRole_0(context, partialProofData, new Uint8Array(32));
    this.__pause_0(context, partialProofData);
    return [];
  }
  _unpauseAccessControl_0(context, partialProofData) {
    this._assertInitialized_0(context, partialProofData);
    this._assertPaused_0(context, partialProofData);
    this.__assertOnlyRole_0(context, partialProofData, new Uint8Array(32));
    this.__unpause_0(context, partialProofData);
    return [];
  }
  __getRoleAdmin_0(roleId_0) {
    if (this._equal_1(roleId_0,
                      __compactRuntime.convertFieldToBytes(32,
                                                           2n,
                                                           'AccessControl.compact line 286 char 20')))
    {
      return __compactRuntime.convertFieldToBytes(32,
                                                  1n,
                                                  'AccessControl.compact line 287 char 14');
    } else {
      if (this._equal_2(roleId_0,
                        __compactRuntime.convertFieldToBytes(32,
                                                             4n,
                                                             'AccessControl.compact line 290 char 20')))
      {
        return __compactRuntime.convertFieldToBytes(32,
                                                    3n,
                                                    'AccessControl.compact line 291 char 14');
      } else {
        if (this._equal_3(roleId_0,
                          __compactRuntime.convertFieldToBytes(32,
                                                               6n,
                                                               'AccessControl.compact line 294 char 20')))
        {
          return __compactRuntime.convertFieldToBytes(32,
                                                      5n,
                                                      'AccessControl.compact line 295 char 14');
        } else {
          if (this._equal_4(roleId_0,
                            __compactRuntime.convertFieldToBytes(32,
                                                                 8n,
                                                                 'AccessControl.compact line 298 char 20')))
          {
            return __compactRuntime.convertFieldToBytes(32,
                                                        7n,
                                                        'AccessControl.compact line 299 char 14');
          } else {
            return new Uint8Array(32);
          }
        }
      }
    }
  }
  __assertOnlyRole_0(context, partialProofData, roleId_0) {
    this.__checkRole_0(context,
                       partialProofData,
                       roleId_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    return [];
  }
  __checkRole_0(context, partialProofData, roleId_0, account_0) {
    __compactRuntime.assert(this.__hasRole_0(context,
                                             partialProofData,
                                             roleId_0,
                                             account_0),
                            'AccessControl: unauthorized account');
    return [];
  }
  __hasRole_0(context, partialProofData, roleId_0, account_0) {
    if (_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value)
        &&
        _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_0.toValue(roleId_0),
                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(account_0),
                                                                                                                          alignment: _descriptor_14.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(roleId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(account_0),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    } else {
      return false;
    }
  }
  __grantRole_0(context, partialProofData, roleId_0, account_0) {
    if (this.__hasRole_0(context, partialProofData, roleId_0, account_0)) {
      return false;
    } else {
      if (!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(0n),
                                                                                                 alignment: _descriptor_26.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(0n),
                                                                                                 alignment: _descriptor_26.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value))
      {
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(0n),
                                                                      alignment: _descriptor_26.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(0n),
                                                                      alignment: _descriptor_26.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newMap(
                                                              new __compactRuntime.StateMap()
                                                            ).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 2 } }]);
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(0n),
                                                                      alignment: _descriptor_26.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(0n),
                                                                      alignment: _descriptor_26.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_0.toValue(roleId_0),
                                                                      alignment: _descriptor_0.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(account_0),
                                                                                                  alignment: _descriptor_14.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                                  alignment: _descriptor_8.alignment() }).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 3 } }]);
        return true;
      } else {
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(0n),
                                                                      alignment: _descriptor_26.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(0n),
                                                                      alignment: _descriptor_26.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_0.toValue(roleId_0),
                                                                      alignment: _descriptor_0.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(account_0),
                                                                                                  alignment: _descriptor_14.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                                  alignment: _descriptor_8.alignment() }).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 3 } }]);
        return true;
      }
    }
  }
  __revokeRole_0(context, partialProofData, roleId_0, account_0) {
    if (!this.__hasRole_0(context, partialProofData, roleId_0, account_0)) {
      return false;
    } else {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(0n),
                                                                    alignment: _descriptor_26.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(0n),
                                                                    alignment: _descriptor_26.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_0.toValue(roleId_0),
                                                                    alignment: _descriptor_0.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(account_0),
                                                                                                alignment: _descriptor_14.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                                alignment: _descriptor_8.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 3 } }]);
      return true;
    }
  }
  _initialize_1(context, partialProofData) {
    this._assertNotInitialized_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(0n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(3n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_0(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(3n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _assertPaused_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(0n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(4n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Pausable: not paused');
    return [];
  }
  _assertNotPaused_0(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(4n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Pausable: paused');
    return [];
  }
  __pause_0(context, partialProofData) {
    this._assertNotPaused_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(4n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  __unpause_0(context, partialProofData) {
    this._assertPaused_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(4n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _initialize_2(context, partialProofData) {
    this._initialize_3(context, partialProofData); return [];
  }
  _assertOwnVerification_0(context, partialProofData) {
    const user_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(0n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(5n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(user_0),
                                                                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Identity: User not verified');
    return [];
  }
  _isUserVerified_0(context, partialProofData, user_0) {
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(0n),
                                                                                                 alignment: _descriptor_26.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(5n),
                                                                                                 alignment: _descriptor_26.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(user_0),
                                                                                                                             alignment: _descriptor_12.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _setUser_0(context, partialProofData, user_0) {
    this._assertInitialized_1(context, partialProofData);
    this._assertNotPaused_1(context, partialProofData);
    this.__setUser_0(context, partialProofData, user_0);
    return [];
  }
  _removeUser_0(context, partialProofData, user_0) {
    this._assertInitialized_1(context, partialProofData);
    this._assertNotPaused_1(context, partialProofData);
    this.__removeUser_0(context, partialProofData, user_0);
    return [];
  }
  _pauseIdentity_0(context, partialProofData) {
    this._assertInitialized_1(context, partialProofData);
    this._assertNotPaused_1(context, partialProofData);
    this.__pause_1(context, partialProofData);
    return [];
  }
  _unpauseIdentity_0(context, partialProofData) {
    this._assertInitialized_1(context, partialProofData);
    this._assertPaused_1(context, partialProofData);
    this.__unpause_1(context, partialProofData);
    return [];
  }
  __setUser_0(context, partialProofData, user_0) {
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(5n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(user_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  __removeUser_0(context, partialProofData, user_0) {
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(5n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(user_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _initialize_3(context, partialProofData) {
    this._assertNotInitialized_1(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(6n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_1(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(0n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(6n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_1(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(6n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _assertPaused_1(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(0n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(7n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Pausable: not paused');
    return [];
  }
  _assertNotPaused_1(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(7n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Pausable: paused');
    return [];
  }
  __pause_1(context, partialProofData) {
    this._assertNotPaused_1(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  __unpause_1(context, partialProofData) {
    this._assertPaused_1(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _initialize_4(context, partialProofData, name__0, symbol__0) {
    this._initialize_5(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(8n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(name__0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(9n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(symbol__0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _balanceOf_0(context, partialProofData, owner_0) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    if (!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(owner_0),
                                                                                                                           alignment: _descriptor_14.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      return 0n;
    } else {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(1n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(1n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(owner_0),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  }
  _ownerOf_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    return this.__requireOwned_0(context, partialProofData, tokenId_0);
  }
  _tokenCertificate_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    this.__requireOwned_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(4n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token does not exist');
    return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_26.toValue(4n),
                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
  }
  _tokenPrice_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    this.__requireOwned_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(5n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token does not exist');
    return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(1n),
                                                                                                 alignment: _descriptor_26.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(5n),
                                                                                                 alignment: _descriptor_26.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                 alignment: _descriptor_1.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _mint_0(context,
          partialProofData,
          to_0,
          tokenId_0,
          tokenCertificate_0,
          price_0)
  {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(10n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_16.toValue(tmp_0),
                                                                alignment: _descriptor_16.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    this.__mint_0(context, partialProofData, to_0, tokenId_0, tokenCertificate_0);
    this.__setTokenPrice_0(context, partialProofData, tokenId_0, price_0);
    return [];
  }
  _burn_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    this.__burn_0(context, partialProofData, tokenId_0);
    return [];
  }
  _setTokenPrice_0(context, partialProofData, tokenId_0, price_0) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    __compactRuntime.assert(this._equal_5(this.__ownerOf_0(context,
                                                           partialProofData,
                                                           tokenId_0),
                                          this._left_0(this._ownPublicKey_0(context,
                                                                            partialProofData))),
                            'Not owner');
    this.__setTokenPrice_0(context, partialProofData, tokenId_0, price_0);
    return [];
  }
  _pauseToken_0(context, partialProofData) {
    this._assertInitialized_2(context, partialProofData);
    this._assertNotPaused_2(context, partialProofData);
    this.__pause_2(context, partialProofData);
    return [];
  }
  _unpauseToken_0(context, partialProofData) {
    this._assertInitialized_2(context, partialProofData);
    this._assertPaused_2(context, partialProofData);
    this.__unpause_2(context, partialProofData);
    return [];
  }
  __update_0(context, partialProofData, to_0, tokenId_0, auth_0) {
    const from__0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    if (!this._isKeyOrAddressZero_0(auth_0)) {
      this.__checkAuthorized_0(context,
                               partialProofData,
                               from__0,
                               auth_0,
                               tokenId_0);
    }
    if (!this._isKeyOrAddressZero_0(from__0)) {
      this.__approve_0(context,
                       partialProofData,
                       this._shieldedBurnAddress_0(),
                       tokenId_0,
                       this._shieldedBurnAddress_0());
      let t_0;
      const newBalance_0 = (t_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                            partialProofData,
                                                                                            [
                                                                                             { dup: { n: 0 } },
                                                                                             { idx: { cached: false,
                                                                                                      pushPath: false,
                                                                                                      path: [
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_26.toValue(1n),
                                                                                                                        alignment: _descriptor_26.alignment() } },
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_26.toValue(1n),
                                                                                                                        alignment: _descriptor_26.alignment() } }] } },
                                                                                             { idx: { cached: false,
                                                                                                      pushPath: false,
                                                                                                      path: [
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_14.toValue(from__0),
                                                                                                                        alignment: _descriptor_14.alignment() } }] } },
                                                                                             { popeq: { cached: false,
                                                                                                        result: undefined } }]).value),
                            (__compactRuntime.assert(t_0 >= 1n,
                                                     'result of subtraction would be negative'),
                             t_0 - 1n));
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(from__0),
                                                                                                alignment: _descriptor_14.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(newBalance_0),
                                                                                                alignment: _descriptor_1.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    if (!this._isKeyOrAddressZero_0(to_0)) {
      if (!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(1n),
                                                                                                 alignment: _descriptor_26.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_26.toValue(1n),
                                                                                                 alignment: _descriptor_26.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(to_0),
                                                                                                                             alignment: _descriptor_14.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value))
      {
        const tmp_0 = 0n;
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(1n),
                                                                      alignment: _descriptor_26.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_26.toValue(1n),
                                                                      alignment: _descriptor_26.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(to_0),
                                                                                                  alignment: _descriptor_14.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                                                  alignment: _descriptor_1.alignment() }).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 2 } }]);
      }
      const newBalance_1 = ((t1) => {
                             if (t1 > 340282366920938463463374607431768211455n) {
                               throw new __compactRuntime.CompactError('src/./modules/token-nft/NonFungibleToken.compact line 568 char 26: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                             }
                             return t1;
                           })(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_26.toValue(1n),
                                                                                                                    alignment: _descriptor_26.alignment() } },
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_26.toValue(1n),
                                                                                                                    alignment: _descriptor_26.alignment() } }] } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_14.toValue(to_0),
                                                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                                                         { popeq: { cached: false,
                                                                                                    result: undefined } }]).value)
                              +
                              1n);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(to_0),
                                                                                                alignment: _descriptor_14.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(newBalance_1),
                                                                                                alignment: _descriptor_1.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(to_0),
                                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return from__0;
  }
  __mint_0(context, partialProofData, to_0, tokenId_0, tokenCertificate_0) {
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(to_0),
                            'NonFungibleToken: Invalid Receiver');
    const previousOwner_0 = this.__update_0(context,
                                            partialProofData,
                                            to_0,
                                            tokenId_0,
                                            this._shieldedBurnAddress_0());
    this.__setTokenCertificate_0(context,
                                 partialProofData,
                                 tokenId_0,
                                 tokenCertificate_0);
    __compactRuntime.assert(this._isKeyOrAddressZero_0(previousOwner_0),
                            'NonFungibleToken: Invalid Sender');
    return [];
  }
  __burn_0(context, partialProofData, tokenId_0) {
    const previousOwner_0 = this.__update_0(context,
                                            partialProofData,
                                            this._shieldedBurnAddress_0(),
                                            tokenId_0,
                                            this._shieldedBurnAddress_0());
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(previousOwner_0),
                            'NonFungibleToken: Invalid Sender');
    return [];
  }
  __approve_0(context, partialProofData, to_0, tokenId_0, auth_0) {
    if (!this._isKeyOrAddressZero_0(auth_0)) {
      const owner_0 = this.__requireOwned_0(context, partialProofData, tokenId_0);
      __compactRuntime.assert(this._equal_6(owner_0, auth_0)
                              ||
                              this.__isApprovedForAll_0(context,
                                                        partialProofData,
                                                        owner_0,
                                                        auth_0),
                              'NonFungibleToken: Invalid Approver');
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(to_0),
                                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  __requireOwned_0(context, partialProofData, tokenId_0) {
    const owner_0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(owner_0),
                            'NonFungibleToken: Nonexistent Token');
    return owner_0;
  }
  __ownerOf_0(context, partialProofData, tokenId_0) {
    if (!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_26.toValue(0n),
                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                                                           alignment: _descriptor_1.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      return this._shieldedBurnAddress_0();
    } else {
      return _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_26.toValue(1n),
                                                                                                    alignment: _descriptor_26.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_26.toValue(0n),
                                                                                                    alignment: _descriptor_26.alignment() } }] } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                    alignment: _descriptor_1.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    }
  }
  __setTokenCertificate_0(context,
                          partialProofData,
                          tokenId_0,
                          tokenCertificate_0)
  {
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(4n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tokenCertificate_0),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  __setTokenPrice_0(context, partialProofData, tokenId_0, price_0) {
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(5n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(price_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  __isApprovedForAll_0(context, partialProofData, owner_0, operator_0) {
    if (_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(1n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(owner_0),
                                                                                                                          alignment: _descriptor_14.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value)
        &&
        _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(1n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(owner_0),
                                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(operator_0),
                                                                                                                          alignment: _descriptor_14.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(1n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(3n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(owner_0),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(operator_0),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    } else {
      return false;
    }
  }
  __isAuthorized_0(context, partialProofData, owner_0, spender_0, tokenId_0) {
    return !this._isKeyOrAddressZero_0(spender_0)
           &&
           (this._equal_7(owner_0, spender_0)
            ||
            this.__isApprovedForAll_0(context,
                                      partialProofData,
                                      owner_0,
                                      spender_0)
            ||
            this._equal_8(this.__getApproved_0(context,
                                               partialProofData,
                                               tokenId_0),
                          spender_0));
  }
  __checkAuthorized_0(context, partialProofData, owner_0, spender_0, tokenId_0)
  {
    if (!this.__isAuthorized_0(context,
                               partialProofData,
                               owner_0,
                               spender_0,
                               tokenId_0))
    {
      __compactRuntime.assert(!this._isKeyOrAddressZero_0(owner_0),
                              'NonFungibleToken: Nonexistent Token');
      __compactRuntime.assert(false, 'NonFungibleToken: Insufficient Approval');
    }
    return [];
  }
  __getApproved_0(context, partialProofData, tokenId_0) {
    if (!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_26.toValue(2n),
                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                                                           alignment: _descriptor_1.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      return this._shieldedBurnAddress_0();
    } else {
      return _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_26.toValue(1n),
                                                                                                    alignment: _descriptor_26.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_26.toValue(2n),
                                                                                                    alignment: _descriptor_26.alignment() } }] } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                    alignment: _descriptor_1.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    }
  }
  _initialize_5(context, partialProofData) {
    this._assertNotInitialized_2(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(6n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_2(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(6n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_2(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(1n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(6n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _assertPaused_2(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(7n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Pausable: not paused');
    return [];
  }
  _assertNotPaused_2(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(1n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(7n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Pausable: paused');
    return [];
  }
  __pause_2(context, partialProofData) {
    this._assertNotPaused_2(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  __unpause_2(context, partialProofData) {
    this._assertPaused_2(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(7n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _isKeyOrAddressZero_0(keyOrAddress_0) {
    if (this._isContractAddress_0(keyOrAddress_0)) {
      return this._equal_9({ bytes: new Uint8Array(32) }, keyOrAddress_0.right);
    } else {
      return this._equal_10({ bytes: new Uint8Array(32) }, keyOrAddress_0.left);
    }
  }
  _isContractAddress_0(keyOrAddress_0) { return !keyOrAddress_0.is_left; }
  _wit_secretNonce_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.wit_secretNonce(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('wit_secretNonce',
                                 'return value',
                                 'BucketDEFI.compact line 159 char 3',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _initialize_6(context, partialProofData) {
    this._initialize_7(context, partialProofData); return [];
  }
  _createBucket_0(context, partialProofData, conditions_0, coin_0) {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    this._receiveShielded_0(context, partialProofData, coin_0);
    __compactRuntime.assert(this._equal_11(coin_0.value, conditions_0.pot),
                            'requires to deposit the pot amount');
    __compactRuntime.assert(this._equal_12(coin_0.color, this._nativeToken_0()),
                            'Invalid coin provided');
    const nonce_0 = this._wit_secretNonce_0(context, partialProofData);
    const callerAsEither_0 = { is_left: true,
                               left:
                                 this._ownPublicKey_0(context, partialProofData),
                               right:
                                 { bytes:
                                     new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } };
    const id_0 = this.__computeOwnerId_0(callerAsEither_0, nonce_0);
    const ownerCommitment_0 = this.__computeOwnerCommitment_0(id_0,
                                                              _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                        partialProofData,
                                                                                                                        [
                                                                                                                         { dup: { n: 0 } },
                                                                                                                         { idx: { cached: false,
                                                                                                                                  pushPath: false,
                                                                                                                                  path: [
                                                                                                                                         { tag: 'value',
                                                                                                                                           value: { value: _descriptor_26.toValue(1n),
                                                                                                                                                    alignment: _descriptor_26.alignment() } },
                                                                                                                                         { tag: 'value',
                                                                                                                                           value: { value: _descriptor_26.toValue(12n),
                                                                                                                                                    alignment: _descriptor_26.alignment() } }] } },
                                                                                                                         { popeq: { cached: true,
                                                                                                                                    result: undefined } }]).value));
    const tmp_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_26.toValue(1n),
                                                                                                        alignment: _descriptor_26.alignment() } },
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_26.toValue(12n),
                                                                                                        alignment: _descriptor_26.alignment() } }] } },
                                                                             { popeq: { cached: true,
                                                                                        result: undefined } }]).value);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(11n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(9n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(conditions_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                           partialProofData,
                                                                                           [
                                                                                            { dup: { n: 2 } },
                                                                                            { idx: { cached: true,
                                                                                                     pushPath: false,
                                                                                                     path: [
                                                                                                            { tag: 'value',
                                                                                                              value: { value: _descriptor_26.toValue(0n),
                                                                                                                       alignment: _descriptor_26.alignment() } }] } },
                                                                                            { popeq: { cached: true,
                                                                                                       result: undefined } }]).value));
    __compactRuntime.hasCoinCommitment(context, coin_0, tmp_1) ? __compactRuntime.queryLedgerState(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: true,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_26.toValue(10n),
                                                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                                                    { push: { storage: false,
                                                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                                                                           alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                    { dup: { n: 7 } },
                                                                                                    { push: { storage: false,
                                                                                                              value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                           { value: _descriptor_11.toValue(coin_0),
                                                                                                                                                             alignment: _descriptor_11.alignment() },
                                                                                                                                                           { value: _descriptor_14.toValue(tmp_1),
                                                                                                                                                             alignment: _descriptor_14.alignment() }
                                                                                                                                                         )).encode() } },
                                                                                                    { idx: { cached: true,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                                                    { tag: 'stack' }] } },
                                                                                                    { push: { storage: false,
                                                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(coin_0),
                                                                                                                                                           alignment: _descriptor_11.alignment() }).encode() } },
                                                                                                    { swap: { n: 0 } },
                                                                                                    { concat: { cached: true,
                                                                                                                n: 91 } },
                                                                                                    { ins: { cached: false,
                                                                                                             n: 1 } },
                                                                                                    { ins: { cached: true,
                                                                                                             n: 2 } }]) : (() => { throw new __compactRuntime.CompactError(`BucketDEFI.compact line 222 char 5: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(8n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_2 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(12n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_16.toValue(tmp_2),
                                                                alignment: _descriptor_16.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    return ownerCommitment_0;
  }
  _addCertificateToBucket_0(context,
                            partialProofData,
                            ownerCommitment_0,
                            tokenId_0,
                            tokenPrice_0)
  {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    __compactRuntime.assert(!this.__isTokenLocked_0(context,
                                                    partialProofData,
                                                    tokenId_0),
                            'Token is locked');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(8n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                  alignment: _descriptor_0.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 3 } }]);
    const bucketConditions_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(9n),
                                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value);
    const updatedBucketConditions_0 = { source: bucketConditions_0.source,
                                        unitPrice: bucketConditions_0.unitPrice,
                                        vintageLimit:
                                          bucketConditions_0.vintageLimit,
                                        impact: bucketConditions_0.impact,
                                        location: bucketConditions_0.location,
                                        status: bucketConditions_0.status,
                                        accumulatedPrice:
                                          ((t1) => {
                                            if (t1 > 340282366920938463463374607431768211455n) {
                                              throw new __compactRuntime.CompactError('BucketDEFI.compact line 265 char 89: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                            }
                                            return t1;
                                          })(bucketConditions_0.accumulatedPrice
                                             +
                                             tokenPrice_0),
                                        pot: bucketConditions_0.pot,
                                        startDate: bucketConditions_0.startDate,
                                        endDate: bucketConditions_0.endDate };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(9n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updatedBucketConditions_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(0n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(14n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _settleBucket_0(context, partialProofData, ownerCommitment_0) {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    const conditions_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_26.toValue(9n),
                                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(conditions_0.status !== 1,
                            'Bucket is already settled');
    __compactRuntime.assert(this._blockTimeGte_0(context,
                                                 partialProofData,
                                                 conditions_0.endDate),
                            'Current time is before end date');
    const updatedCond_0 = { source: conditions_0.source,
                            unitPrice: conditions_0.unitPrice,
                            vintageLimit: conditions_0.vintageLimit,
                            impact: conditions_0.impact,
                            location: conditions_0.location,
                            status: 1,
                            accumulatedPrice: conditions_0.accumulatedPrice,
                            pot: conditions_0.pot,
                            startDate: conditions_0.startDate,
                            endDate: conditions_0.endDate };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(9n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updatedCond_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _claimCertificateReward_0(context,
                            partialProofData,
                            tokenId_0,
                            tokenPrice_0,
                            owner_0)
  {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    const bucket_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_26.toValue(1n),
                                                                                                           alignment: _descriptor_26.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_26.toValue(14n),
                                                                                                           alignment: _descriptor_26.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                           alignment: _descriptor_1.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    const bucketConditions_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(9n),
                                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(bucket_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value);
    __compactRuntime.assert(bucketConditions_0.status === 1
                            ||
                            bucketConditions_0.status === 2,
                            'Bucket is not settled or claimed');
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(2n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                                  alignment: _descriptor_1.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            false,
                            'Certificate has already been claimed');
    const pot_0 = _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(1n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(10n),
                                                                                                         alignment: _descriptor_26.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(bucket_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
    const send_result_0 = this._sendShielded_0(context,
                                               partialProofData,
                                               pot_0,
                                               owner_0,
                                               tokenPrice_0);
    if (!this._equal_13(send_result_0.change.value.value, 0n)) {
      const tmp_0 = send_result_0.change.value;
      const tmp_1 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 2 } },
                                                                                              { idx: { cached: true,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                                         alignment: _descriptor_26.alignment() } }] } },
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value));
      __compactRuntime.hasCoinCommitment(context, tmp_0, tmp_1) ? __compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: true,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_26.toValue(1n),
                                                                                                                                alignment: _descriptor_26.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_26.toValue(10n),
                                                                                                                                alignment: _descriptor_26.alignment() } }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(bucket_0),
                                                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                     { dup: { n: 7 } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                            { value: _descriptor_11.toValue(tmp_0),
                                                                                                                                                              alignment: _descriptor_11.alignment() },
                                                                                                                                                            { value: _descriptor_14.toValue(tmp_1),
                                                                                                                                                              alignment: _descriptor_14.alignment() }
                                                                                                                                                          )).encode() } },
                                                                                                     { idx: { cached: true,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_26.toValue(1n),
                                                                                                                                alignment: _descriptor_26.alignment() } },
                                                                                                                     { tag: 'stack' }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tmp_0),
                                                                                                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                                                                                                     { swap: { n: 0 } },
                                                                                                     { concat: { cached: true,
                                                                                                                 n: 91 } },
                                                                                                     { ins: { cached: false,
                                                                                                              n: 1 } },
                                                                                                     { ins: { cached: true,
                                                                                                              n: 2 } }]) : (() => { throw new __compactRuntime.CompactError(`BucketDEFI.compact line 352 char 8: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    } else {
      const tmp_2 = { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n };
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(10n),
                                                                    alignment: _descriptor_26.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(bucket_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(tmp_2),
                                                                                                alignment: _descriptor_15.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _withdrawBucketLeftover_0(context, partialProofData, ownerCommitment_0) {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    const isOwner_0 = this.__isBucketOwner_0(context,
                                             partialProofData,
                                             ownerCommitment_0);
    __compactRuntime.assert(isOwner_0, 'Not the owner');
    const bucketConditions_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(9n),
                                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value);
    __compactRuntime.assert(bucketConditions_0.status === 1,
                            'Bucket is not settled');
    let t_0, t_1;
    const leftovers_0 = (t_0 = bucketConditions_0.pot,
                         (t_1 = bucketConditions_0.accumulatedPrice,
                          (__compactRuntime.assert(t_0 >= t_1,
                                                   'result of subtraction would be negative'),
                           t_0 - t_1)));
    const pot_0 = _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(1n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(10n),
                                                                                                         alignment: _descriptor_26.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
    const caller_0 = { is_left: true,
                       left: this._ownPublicKey_0(context, partialProofData),
                       right:
                         { bytes:
                             new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } };
    const send_result_0 = this._sendShielded_0(context,
                                               partialProofData,
                                               pot_0,
                                               caller_0,
                                               leftovers_0);
    if (!this._equal_14(send_result_0.change.value.value, 0n)) {
      const tmp_0 = send_result_0.change.value;
      const tmp_1 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 2 } },
                                                                                              { idx: { cached: true,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                                         alignment: _descriptor_26.alignment() } }] } },
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value));
      __compactRuntime.hasCoinCommitment(context, tmp_0, tmp_1) ? __compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: true,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_26.toValue(1n),
                                                                                                                                alignment: _descriptor_26.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_26.toValue(10n),
                                                                                                                                alignment: _descriptor_26.alignment() } }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                     { dup: { n: 7 } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                            { value: _descriptor_11.toValue(tmp_0),
                                                                                                                                                              alignment: _descriptor_11.alignment() },
                                                                                                                                                            { value: _descriptor_14.toValue(tmp_1),
                                                                                                                                                              alignment: _descriptor_14.alignment() }
                                                                                                                                                          )).encode() } },
                                                                                                     { idx: { cached: true,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_26.toValue(1n),
                                                                                                                                alignment: _descriptor_26.alignment() } },
                                                                                                                     { tag: 'stack' }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tmp_0),
                                                                                                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                                                                                                     { swap: { n: 0 } },
                                                                                                     { concat: { cached: true,
                                                                                                                 n: 91 } },
                                                                                                     { ins: { cached: false,
                                                                                                              n: 1 } },
                                                                                                     { ins: { cached: true,
                                                                                                              n: 2 } }]) : (() => { throw new __compactRuntime.CompactError(`BucketDEFI.compact line 412 char 8: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    } else {
      const tmp_2 = { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n };
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(1n),
                                                                    alignment: _descriptor_26.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_26.toValue(10n),
                                                                    alignment: _descriptor_26.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(tmp_2),
                                                                                                alignment: _descriptor_15.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    const updatedCond_0 = { source: bucketConditions_0.source,
                            unitPrice: bucketConditions_0.unitPrice,
                            vintageLimit: bucketConditions_0.vintageLimit,
                            impact: bucketConditions_0.impact,
                            location: bucketConditions_0.location,
                            status: 2,
                            accumulatedPrice:
                              bucketConditions_0.accumulatedPrice,
                            pot: bucketConditions_0.pot,
                            startDate: bucketConditions_0.startDate,
                            endDate: bucketConditions_0.endDate };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(9n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updatedCond_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _proofBucketOwnership_0(context,
                          partialProofData,
                          ownerCommitment_0,
                          challenge_0)
  {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    const isOwner_0 = this.__isBucketOwner_0(context,
                                             partialProofData,
                                             ownerCommitment_0);
    __compactRuntime.assert(isOwner_0, 'Not the owner');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(1n),
                                                                  alignment: _descriptor_26.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(13n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(challenge_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _pauseBucketDEFI_0(context, partialProofData) {
    this._assertInitialized_3(context, partialProofData);
    this._assertNotPaused_3(context, partialProofData);
    this.__pause_3(context, partialProofData);
    return [];
  }
  _unpauseBucketDEFI_0(context, partialProofData) {
    this._assertInitialized_3(context, partialProofData);
    this._assertPaused_3(context, partialProofData);
    this.__unpause_3(context, partialProofData);
    return [];
  }
  __computeOwnerCommitment_0(id_0, counter_0) {
    return this._persistentHash_2([id_0,
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        counter_0,
                                                                        'BucketDEFI.compact line 501 char 19'),
                                   new Uint8Array([66, 117, 99, 107, 101, 116, 68, 69, 70, 73, 58, 32, 115, 104, 105, 101, 108, 100, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])]);
  }
  __computeOwnerId_0(pk_0, nonce_0) {
    __compactRuntime.assert(pk_0.is_left,
                            'BucketDEFI: contract address owners are not yet supported');
    return this._persistentHash_1([pk_0.left.bytes, nonce_0]);
  }
  __isTokenLocked_0(context, partialProofData, tokenId_0) {
    if (_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(2n),
                                                                                              alignment: _descriptor_26.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_26.toValue(0n),
                                                                                              alignment: _descriptor_26.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                                                          alignment: _descriptor_1.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(2n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    } else {
      return false;
    }
  }
  __isBucketOwner_0(context, partialProofData, ownerCommitment_0) {
    const nonce_0 = this._wit_secretNonce_0(context, partialProofData);
    const callerAsEither_0 = { is_left: true,
                               left:
                                 this._ownPublicKey_0(context, partialProofData),
                               right:
                                 { bytes:
                                     new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } };
    const id_0 = this.__computeOwnerId_0(callerAsEither_0, nonce_0);
    const counter_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_26.toValue(1n),
                                                                                                            alignment: _descriptor_26.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_26.toValue(11n),
                                                                                                            alignment: _descriptor_26.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    const ownerCommitmentCalculated_0 = this.__computeOwnerCommitment_0(id_0,
                                                                        counter_0);
    const isOwner_0 = this._equal_15(ownerCommitmentCalculated_0,
                                     ownerCommitment_0);
    return isOwner_0;
  }
  _initialize_7(context, partialProofData) {
    this._assertNotInitialized_3(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(2n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_3(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(2n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(2n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_3(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(2n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(2n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _assertPaused_3(context, partialProofData) {
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(2n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(3n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Pausable: not paused');
    return [];
  }
  _assertNotPaused_3(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(2n),
                                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_26.toValue(3n),
                                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Pausable: paused');
    return [];
  }
  __pause_3(context, partialProofData) {
    this._assertNotPaused_3(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(true),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  __unpause_3(context, partialProofData) {
    this._assertPaused_3(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_26.toValue(2n),
                                                                  alignment: _descriptor_26.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(3n),
                                                                                              alignment: _descriptor_26.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(false),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _grantRole_1(context, partialProofData, roleId_0, account_0) {
    this._grantRole_0(context, partialProofData, roleId_0, account_0);
    return [];
  }
  _revokeRole_1(context, partialProofData, roleId_0, account_0) {
    this._revokeRole_0(context, partialProofData, roleId_0, account_0);
    return [];
  }
  _renounceRole_1(context, partialProofData, roleId_0) {
    this._renounceRole_0(context, partialProofData, roleId_0); return [];
  }
  _setRoleAdmin_1(context, partialProofData, roleId_0, adminRole_0) {
    this._setRoleAdmin_0(context, partialProofData, roleId_0, adminRole_0);
    return [];
  }
  _removeRoleAdmin_1(context, partialProofData, roleId_0, adminRole_0) {
    this._removeRoleAdmin_0(context, partialProofData, roleId_0, adminRole_0);
    return [];
  }
  _assertOnlyRole_1(context, partialProofData, roleId_0) {
    this._assertOnlyRole_0(context, partialProofData, roleId_0); return [];
  }
  _pauseAccessControl_1(context, partialProofData) {
    this._pauseAccessControl_0(context, partialProofData); return [];
  }
  _unpauseAccessControl_1(context, partialProofData) {
    this._unpauseAccessControl_0(context, partialProofData); return [];
  }
  _assertOwnVerification_1(context, partialProofData) {
    this._assertOwnVerification_0(context, partialProofData); return [];
  }
  _isUserVerified_1(context, partialProofData, user_0) {
    return this._isUserVerified_0(context, partialProofData, user_0);
  }
  _setUser_1(context, partialProofData, user_0) {
    this._assertOnlyRole_1(context,
                           partialProofData,
                           __compactRuntime.convertFieldToBytes(32,
                                                                8n,
                                                                'bucket-defi.compact line 254 char 18'));
    this._setUser_0(context, partialProofData, user_0);
    return [];
  }
  _removeUser_1(context, partialProofData, user_0) {
    this._assertOnlyRole_1(context,
                           partialProofData,
                           __compactRuntime.convertFieldToBytes(32,
                                                                8n,
                                                                'bucket-defi.compact line 272 char 18'));
    this._removeUser_0(context, partialProofData, user_0);
    return [];
  }
  _pauseIdentity_1(context, partialProofData) {
    this._assertOnlyRole_1(context, partialProofData, new Uint8Array(32));
    this._pauseIdentity_0(context, partialProofData);
    return [];
  }
  _unpauseIdentity_1(context, partialProofData) {
    this._assertOnlyRole_1(context, partialProofData, new Uint8Array(32));
    this._unpauseIdentity_0(context, partialProofData);
    return [];
  }
  _balanceOf_1(context, partialProofData, owner_0) {
    return this._balanceOf_0(context, partialProofData, owner_0);
  }
  _ownerOf_1(context, partialProofData, tokenId_0) {
    return this._ownerOf_0(context, partialProofData, tokenId_0);
  }
  _tokenCertificate_1(context, partialProofData, tokenId_0) {
    return this._tokenCertificate_0(context, partialProofData, tokenId_0);
  }
  _tokenPrice_1(context, partialProofData, tokenId_0) {
    return this._tokenPrice_0(context, partialProofData, tokenId_0);
  }
  _mint_1(context,
          partialProofData,
          to_0,
          tokenId_0,
          tokenCertificate_0,
          price_0)
  {
    this._assertOnlyRole_1(context,
                           partialProofData,
                           __compactRuntime.convertFieldToBytes(32,
                                                                2n,
                                                                'bucket-defi.compact line 388 char 18'));
    return this._mint_0(context,
                        partialProofData,
                        to_0,
                        tokenId_0,
                        tokenCertificate_0,
                        price_0);
  }
  _burn_1(context, partialProofData, tokenId_0) {
    this._assertOnlyRole_1(context,
                           partialProofData,
                           __compactRuntime.convertFieldToBytes(32,
                                                                6n,
                                                                'bucket-defi.compact line 404 char 18'));
    return this._burn_0(context, partialProofData, tokenId_0);
  }
  _setTokenPrice_1(context, partialProofData, tokenId_0, price_0) {
    this._setTokenPrice_0(context, partialProofData, tokenId_0, price_0);
    return [];
  }
  _pauseToken_1(context, partialProofData) {
    this._assertOnlyRole_1(context, partialProofData, new Uint8Array(32));
    this._pauseToken_0(context, partialProofData);
    return [];
  }
  _unpauseToken_1(context, partialProofData) {
    this._assertOnlyRole_1(context, partialProofData, new Uint8Array(32));
    this._unpauseToken_0(context, partialProofData);
    return [];
  }
  _createBucket_1(context, partialProofData, conditions_0, coin_0) {
    this._assertOwnVerification_1(context, partialProofData);
    return this._createBucket_0(context, partialProofData, conditions_0, coin_0);
  }
  _addCertificateToBucket_1(context,
                            partialProofData,
                            ownerCommitment_0,
                            tokenId_0)
  {
    const owner_0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    const isOwner_0 = this._equal_16(owner_0.left,
                                     this._ownPublicKey_0(context,
                                                          partialProofData));
    if (!isOwner_0) {
      this._assertOnlyRole_1(context,
                             partialProofData,
                             __compactRuntime.convertFieldToBytes(32,
                                                                  4n,
                                                                  'bucket-defi.compact line 499 char 32'));
    }
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(9n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Bucket not found');
    const bucketConditions_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_26.toValue(9n),
                                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(ownerCommitment_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value);
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(1n),
                                                                                                                  alignment: _descriptor_26.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_26.toValue(4n),
                                                                                                                  alignment: _descriptor_26.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token not found');
    const tokenSpecs_0 = _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_26.toValue(1n),
                                                                                                                alignment: _descriptor_26.alignment() } },
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_26.toValue(4n),
                                                                                                                alignment: _descriptor_26.alignment() } }] } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                                alignment: _descriptor_1.alignment() } }] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }]).value);
    const tokenPrice_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_26.toValue(5n),
                                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                               alignment: _descriptor_1.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(bucketConditions_0.source === tokenSpecs_0.source,
                            "Source doesn't match");
    __compactRuntime.assert(bucketConditions_0.unitPrice
                            *
                            tokenSpecs_0.generation
                            >=
                            tokenPrice_0,
                            "Token price doesn't meet unit price");
    __compactRuntime.assert(bucketConditions_0.vintageLimit
                            >=
                            tokenSpecs_0.vintage,
                            "Token vintage doesn't meet vintage limit");
    __compactRuntime.assert(bucketConditions_0.impact === tokenSpecs_0.impact,
                            "Impact doesn't match");
    __compactRuntime.assert(bucketConditions_0.location
                            ===
                            tokenSpecs_0.location,
                            "Location doesn't match");
    __compactRuntime.assert(bucketConditions_0.status === 0,
                            "Bucket status isn't open");
    __compactRuntime.assert(bucketConditions_0.accumulatedPrice + tokenPrice_0
                            <=
                            bucketConditions_0.pot,
                            'Accumulated price exceeds pot');
    __compactRuntime.assert(this._blockTimeGte_0(context,
                                                 partialProofData,
                                                 bucketConditions_0.startDate),
                            'Current time is before start date');
    __compactRuntime.assert(this._blockTimeLte_0(context,
                                                 partialProofData,
                                                 bucketConditions_0.endDate),
                            'Current time is after end date');
    return this._addCertificateToBucket_0(context,
                                          partialProofData,
                                          ownerCommitment_0,
                                          tokenId_0,
                                          tokenPrice_0);
  }
  _settleBucket_1(context, partialProofData, ownerCommitment_0) {
    const isOwner_0 = this.__isBucketOwner_0(context,
                                             partialProofData,
                                             ownerCommitment_0);
    if (!isOwner_0) {
      this._assertOnlyRole_1(context,
                             partialProofData,
                             __compactRuntime.convertFieldToBytes(32,
                                                                  6n,
                                                                  'bucket-defi.compact line 540 char 42'));
    }
    return this._settleBucket_0(context, partialProofData, ownerCommitment_0);
  }
  _claimCertificateReward_1(context, partialProofData, tokenId_0) {
    const owner_0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    const isOwner_0 = this._equal_17(owner_0.left,
                                     this._ownPublicKey_0(context,
                                                          partialProofData));
    __compactRuntime.assert(isOwner_0,
                            'Caller is not the owner of the certificate');
    const tokenPrice_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_26.toValue(1n),
                                                                                                               alignment: _descriptor_26.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_26.toValue(5n),
                                                                                                               alignment: _descriptor_26.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_1.toValue(tokenId_0),
                                                                                                               alignment: _descriptor_1.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    return this._claimCertificateReward_0(context,
                                          partialProofData,
                                          tokenId_0,
                                          tokenPrice_0,
                                          owner_0);
  }
  _withdrawBucketLeftover_1(context, partialProofData, ownerCommitment_0) {
    return this._withdrawBucketLeftover_0(context,
                                          partialProofData,
                                          ownerCommitment_0);
  }
  _proofBucketOwnership_1(context,
                          partialProofData,
                          ownerCommitment_0,
                          challenge_0)
  {
    return this._proofBucketOwnership_0(context,
                                        partialProofData,
                                        ownerCommitment_0,
                                        challenge_0);
  }
  _pauseBucketDEFI_1(context, partialProofData) {
    this._assertOnlyRole_1(context, partialProofData, new Uint8Array(32));
    this._pauseBucketDEFI_0(context, partialProofData);
    return [];
  }
  _unpauseBucketDEFI_1(context, partialProofData) {
    this._assertOnlyRole_1(context, partialProofData, new Uint8Array(32));
    this._unpauseBucketDEFI_0(context, partialProofData);
    return [];
  }
  _equal_0(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_6(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_7(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_8(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_9(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_10(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_11(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_16(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_17(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    AccessControl__operatorRoles: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'AccessControl.compact line 45 char 3',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'AccessControl.compact line 45 char 3',
                                     'Bytes<32>',
                                     key_0)
        }
        if (state.asArray()[0].asArray()[0].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                          alignment: _descriptor_0.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              'size',
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                     alignment: _descriptor_2.alignment() }).encode() } },
                                                                              'eq',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              'size',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'object' && typeof(key_1.is_left) === 'boolean' && typeof(key_1.left) === 'object' && key_1.left.bytes.buffer instanceof ArrayBuffer && key_1.left.bytes.BYTES_PER_ELEMENT === 1 && key_1.left.bytes.length === 32 && typeof(key_1.right) === 'object' && key_1.right.bytes.buffer instanceof ArrayBuffer && key_1.right.bytes.BYTES_PER_ELEMENT === 1 && key_1.right.bytes.length === 32)) {
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'AccessControl.compact line 46 char 37',
                                         'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                         key_1)
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(key_1),
                                                                                                                                     alignment: _descriptor_14.alignment() }).encode() } },
                                                                              'member',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'object' && typeof(key_1.is_left) === 'boolean' && typeof(key_1.left) === 'object' && key_1.left.bytes.buffer instanceof ArrayBuffer && key_1.left.bytes.BYTES_PER_ELEMENT === 1 && key_1.left.bytes.length === 32 && typeof(key_1.right) === 'object' && key_1.right.bytes.buffer instanceof ArrayBuffer && key_1.right.bytes.BYTES_PER_ELEMENT === 1 && key_1.right.bytes.length === 32)) {
              __compactRuntime.typeError('lookup',
                                         'argument 1',
                                         'AccessControl.compact line 46 char 37',
                                         'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                         key_1)
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(0n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(key_1),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[0].asArray()[0].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                                         alignment: _descriptor_0.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_14.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    AccessControl_adminRoles: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'AccessControl.compact line 57 char 3',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'AccessControl.compact line 57 char 3',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get AccessControl__ADMIN_MASTER() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(2n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    Identity__verifiedUsersforBuckets: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'object' && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'Identity.compact line 45 char 3',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     elem_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_12.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[5];
        return self_0.asMap().keys().map((elem) => _descriptor_12.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get NonFungibleToken__name() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(8n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get NonFungibleToken__symbol() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(9n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get NonFungibleToken__certificatesCreatedCounter() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(0n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(10n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    NonFungibleToken__owners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 100 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(0n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 100 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_26.toValue(1n),
                                                                                                      alignment: _descriptor_26.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_26.toValue(0n),
                                                                                                      alignment: _descriptor_26.alignment() } }] } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_1.toValue(key_0),
                                                                                                      alignment: _descriptor_1.alignment() } }] } },
                                                                           { popeq: { cached: false,
                                                                                      result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_14.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__balances: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 111 char 3',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(key_0),
                                                                                                                                 alignment: _descriptor_14.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 111 char 3',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(key_0),
                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_14.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__tokenApprovals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(2n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(2n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 122 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(2n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 122 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_26.toValue(1n),
                                                                                                      alignment: _descriptor_26.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_26.toValue(2n),
                                                                                                      alignment: _descriptor_26.alignment() } }] } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_1.toValue(key_0),
                                                                                                      alignment: _descriptor_1.alignment() } }] } },
                                                                           { popeq: { cached: false,
                                                                                      result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_14.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__operatorApprovals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(3n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(3n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 134 char 3',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(3n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(key_0),
                                                                                                                                 alignment: _descriptor_14.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.is_left) === 'boolean' && typeof(key_0.left) === 'object' && key_0.left.bytes.buffer instanceof ArrayBuffer && key_0.left.bytes.BYTES_PER_ELEMENT === 1 && key_0.left.bytes.length === 32 && typeof(key_0.right) === 'object' && key_0.right.bytes.buffer instanceof ArrayBuffer && key_0.right.bytes.BYTES_PER_ELEMENT === 1 && key_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 134 char 3',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     key_0)
        }
        if (state.asArray()[1].asArray()[3].asMap().get({ value: _descriptor_14.toValue(key_0),
                                                          alignment: _descriptor_14.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(1n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(3n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(key_0),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              'size',
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                     alignment: _descriptor_2.alignment() }).encode() } },
                                                                              'eq',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(1n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(3n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(key_0),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              'size',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'object' && typeof(key_1.is_left) === 'boolean' && typeof(key_1.left) === 'object' && key_1.left.bytes.buffer instanceof ArrayBuffer && key_1.left.bytes.BYTES_PER_ELEMENT === 1 && key_1.left.bytes.length === 32 && typeof(key_1.right) === 'object' && key_1.right.bytes.buffer instanceof ArrayBuffer && key_1.right.bytes.BYTES_PER_ELEMENT === 1 && key_1.right.bytes.length === 32)) {
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'src/./modules/token-nft/NonFungibleToken.compact line 135 char 41',
                                         'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                         key_1)
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(1n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(3n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(key_0),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(key_1),
                                                                                                                                     alignment: _descriptor_14.alignment() }).encode() } },
                                                                              'member',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'object' && typeof(key_1.is_left) === 'boolean' && typeof(key_1.left) === 'object' && key_1.left.bytes.buffer instanceof ArrayBuffer && key_1.left.bytes.BYTES_PER_ELEMENT === 1 && key_1.left.bytes.length === 32 && typeof(key_1.right) === 'object' && key_1.right.bytes.buffer instanceof ArrayBuffer && key_1.right.bytes.BYTES_PER_ELEMENT === 1 && key_1.right.bytes.length === 32)) {
              __compactRuntime.typeError('lookup',
                                         'argument 1',
                                         'src/./modules/token-nft/NonFungibleToken.compact line 135 char 41',
                                         'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                         key_1)
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(1n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_26.toValue(3n),
                                                                                                         alignment: _descriptor_26.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(key_0),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(key_1),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[1].asArray()[3].asMap().get({ value: _descriptor_14.toValue(key_0),
                                                                         alignment: _descriptor_14.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_14.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    NonFungibleToken__tokenToCertificate: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(4n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(4n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 146 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(4n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 146 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_26.toValue(1n),
                                                                                                      alignment: _descriptor_26.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_26.toValue(4n),
                                                                                                      alignment: _descriptor_26.alignment() } }] } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_1.toValue(key_0),
                                                                                                      alignment: _descriptor_1.alignment() } }] } },
                                                                           { popeq: { cached: false,
                                                                                      result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_10.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__tokenToPrice: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 157 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'src/./modules/token-nft/NonFungibleToken.compact line 157 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(1n),
                                                                                                     alignment: _descriptor_26.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_26.toValue(5n),
                                                                                                     alignment: _descriptor_26.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_1.toValue(key_0),
                                                                                                     alignment: _descriptor_1.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_1.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get BucketDEFI__zkBucketCounter() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(1n),
                                                                                                   alignment: _descriptor_26.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_26.toValue(12n),
                                                                                                   alignment: _descriptor_26.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  wit_secretNonce: (...args) => undefined
});
export const pureCircuits = {};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
