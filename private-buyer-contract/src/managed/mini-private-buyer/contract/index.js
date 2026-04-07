import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

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

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

const _descriptor_3 = new __compactRuntime.CompactTypeBytes(32);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.bytes);
  }
}

const _descriptor_4 = new _ZswapCoinPublicKey_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.bytes);
  }
}

const _descriptor_5 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_4.fromValue(value_0),
      right: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_4.toValue(value_0.left).concat(_descriptor_5.toValue(value_0.right)));
  }
}

const _descriptor_6 = new _Either_0();

const _descriptor_7 = __compactRuntime.CompactTypeOpaqueString;

const _descriptor_8 = new __compactRuntime.CompactTypeEnum(5, 1);

const _descriptor_9 = new __compactRuntime.CompactTypeEnum(4, 1);

const _descriptor_10 = new __compactRuntime.CompactTypeEnum(3, 1);

class _Certificate_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_8.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_9.alignment().concat(_descriptor_10.alignment())))));
  }
  fromValue(value_0) {
    return {
      id: _descriptor_7.fromValue(value_0),
      source: _descriptor_8.fromValue(value_0),
      generation: _descriptor_1.fromValue(value_0),
      vintage: _descriptor_1.fromValue(value_0),
      impact: _descriptor_9.fromValue(value_0),
      location: _descriptor_10.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.id).concat(_descriptor_8.toValue(value_0.source).concat(_descriptor_1.toValue(value_0.generation).concat(_descriptor_1.toValue(value_0.vintage).concat(_descriptor_9.toValue(value_0.impact).concat(_descriptor_10.toValue(value_0.location))))));
  }
}

const _descriptor_11 = new _Certificate_0();

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_3.fromValue(value_0),
      color: _descriptor_3.fromValue(value_0),
      value: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.nonce).concat(_descriptor_3.toValue(value_0.color).concat(_descriptor_0.toValue(value_0.value)));
  }
}

const _descriptor_12 = new _ShieldedCoinInfo_0();

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_3.fromValue(value_0),
      color: _descriptor_3.fromValue(value_0),
      value: _descriptor_0.fromValue(value_0),
      mt_index: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.nonce).concat(_descriptor_3.toValue(value_0.color).concat(_descriptor_0.toValue(value_0.value).concat(_descriptor_1.toValue(value_0.mt_index))));
  }
}

const _descriptor_13 = new _QualifiedShieldedCoinInfo_0();

const _descriptor_14 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_15 = __compactRuntime.CompactTypeField;

const _descriptor_16 = new __compactRuntime.CompactTypeVector(3, _descriptor_3);

const _descriptor_17 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_17.alignment().concat(_descriptor_12.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_17.fromValue(value_0),
      info: _descriptor_12.fromValue(value_0),
      dataType: _descriptor_2.fromValue(value_0),
      data: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_17.toValue(value_0.domain_sep).concat(_descriptor_12.toValue(value_0.info).concat(_descriptor_2.toValue(value_0.dataType).concat(_descriptor_3.toValue(value_0.data))));
  }
}

const _descriptor_18 = new _CoinPreimage_0();

const _descriptor_19 = new __compactRuntime.CompactTypeVector(2, _descriptor_3);

const _descriptor_20 = new __compactRuntime.CompactTypeVector(2, _descriptor_15);

class _Maybe_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_12.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_2.fromValue(value_0),
      value: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_some).concat(_descriptor_12.toValue(value_0.value));
  }
}

const _descriptor_21 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_21.alignment().concat(_descriptor_12.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_21.fromValue(value_0),
      sent: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_21.toValue(value_0.change).concat(_descriptor_12.toValue(value_0.sent));
  }
}

const _descriptor_22 = new _ShieldedSendResult_0();

class _Either_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_3.fromValue(value_0),
      right: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_3.toValue(value_0.left).concat(_descriptor_3.toValue(value_0.right)));
  }
}

const _descriptor_23 = new _Either_1();

const _descriptor_24 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

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
                                     'mini-private-buyer.compact line 60 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(to_0) === 'object' && typeof(to_0.is_left) === 'boolean' && typeof(to_0.left) === 'object' && to_0.left.bytes.buffer instanceof ArrayBuffer && to_0.left.bytes.BYTES_PER_ELEMENT === 1 && to_0.left.bytes.length === 32 && typeof(to_0.right) === 'object' && to_0.right.bytes.buffer instanceof ArrayBuffer && to_0.right.bytes.BYTES_PER_ELEMENT === 1 && to_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('mint',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 60 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     to_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('mint',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 60 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        if (!(typeof(tokenCertificate_0) === 'object' && true && typeof(tokenCertificate_0.source) === 'number' && tokenCertificate_0.source >= 0 && tokenCertificate_0.source <= 5 && typeof(tokenCertificate_0.generation) === 'bigint' && tokenCertificate_0.generation >= 0n && tokenCertificate_0.generation <= 18446744073709551615n && typeof(tokenCertificate_0.vintage) === 'bigint' && tokenCertificate_0.vintage >= 0n && tokenCertificate_0.vintage <= 18446744073709551615n && typeof(tokenCertificate_0.impact) === 'number' && tokenCertificate_0.impact >= 0 && tokenCertificate_0.impact <= 4 && typeof(tokenCertificate_0.location) === 'number' && tokenCertificate_0.location >= 0 && tokenCertificate_0.location <= 3)) {
          __compactRuntime.typeError('mint',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 60 char 1',
                                     'struct Certificate<id: Opaque<"string">, source: Enum<Source, Solar, Wind, Hydro, Biomass, Geothermal, Nuclear>, generation: Uint<0..18446744073709551616>, vintage: Uint<0..18446744073709551616>, impact: Enum<Impact, Minimal, Low, Medium, High, Extreme>, location: Enum<Location, RJ, SP, MG, RS>>',
                                     tokenCertificate_0)
        }
        if (!(typeof(price_0) === 'bigint' && price_0 >= 0n && price_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('mint',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 60 char 1',
                                     'Uint<0..18446744073709551616>',
                                     price_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(to_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_11.toValue(tokenCertificate_0).concat(_descriptor_1.toValue(price_0)))),
            alignment: _descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_11.alignment().concat(_descriptor_1.alignment())))
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
                                     'mini-private-buyer.compact line 71 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('burn',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 71 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._burn_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addToPool: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addToPool: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('addToPool',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-private-buyer.compact line 86 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('addToPool',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 86 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addToPool_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeFromPool: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeFromPool: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeFromPool',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-private-buyer.compact line 95 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('removeFromPool',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 95 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeFromPool_1(context,
                                                partialProofData,
                                                tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      purchaseNFT: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`purchaseNFT: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        const coin_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('purchaseNFT',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-private-buyer.compact line 102 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('purchaseNFT',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 102 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('purchaseNFT',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 102 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0).concat(_descriptor_12.toValue(coin_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_12.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._purchaseNFT_1(context,
                                             partialProofData,
                                             tokenId_0,
                                             coin_0);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdrawSellerFunds: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`withdrawSellerFunds: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('withdrawSellerFunds',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-private-buyer.compact line 127 char 1',
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
        const result_0 = this._withdrawSellerFunds_1(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      proofOwnership: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`proofOwnership: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerCommitment_0 = args_1[1];
        const challenge_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proofOwnership',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-private-buyer.compact line 134 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerCommitment_0.buffer instanceof ArrayBuffer && ownerCommitment_0.BYTES_PER_ELEMENT === 1 && ownerCommitment_0.length === 32)) {
          __compactRuntime.typeError('proofOwnership',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 134 char 1',
                                     'Bytes<32>',
                                     ownerCommitment_0)
        }
        if (!(challenge_0.buffer instanceof ArrayBuffer && challenge_0.BYTES_PER_ELEMENT === 1 && challenge_0.length === 32)) {
          __compactRuntime.typeError('proofOwnership',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 134 char 1',
                                     'Bytes<32>',
                                     challenge_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(ownerCommitment_0).concat(_descriptor_3.toValue(challenge_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_3.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proofOwnership_1(context,
                                                partialProofData,
                                                ownerCommitment_0,
                                                challenge_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      burnPurchased: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`burnPurchased: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerCommitment_0 = args_1[1];
        const tokenId_0 = args_1[2];
        const challenge_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('burnPurchased',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-private-buyer.compact line 141 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerCommitment_0.buffer instanceof ArrayBuffer && ownerCommitment_0.BYTES_PER_ELEMENT === 1 && ownerCommitment_0.length === 32)) {
          __compactRuntime.typeError('burnPurchased',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 141 char 1',
                                     'Bytes<32>',
                                     ownerCommitment_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('burnPurchased',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 141 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        if (!(challenge_0.buffer instanceof ArrayBuffer && challenge_0.BYTES_PER_ELEMENT === 1 && challenge_0.length === 32)) {
          __compactRuntime.typeError('burnPurchased',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 141 char 1',
                                     'Bytes<32>',
                                     challenge_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(ownerCommitment_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_3.toValue(challenge_0))),
            alignment: _descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._burnPurchased_0(context,
                                               partialProofData,
                                               ownerCommitment_0,
                                               tokenId_0,
                                               challenge_0);
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
                                     'mini-private-buyer.compact line 159 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(owner_0) === 'object' && typeof(owner_0.is_left) === 'boolean' && typeof(owner_0.left) === 'object' && owner_0.left.bytes.buffer instanceof ArrayBuffer && owner_0.left.bytes.BYTES_PER_ELEMENT === 1 && owner_0.left.bytes.length === 32 && typeof(owner_0.right) === 'object' && owner_0.right.bytes.buffer instanceof ArrayBuffer && owner_0.right.bytes.BYTES_PER_ELEMENT === 1 && owner_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('balanceOf',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 159 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     owner_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(owner_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._balanceOf_1(context, partialProofData, owner_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
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
                                     'mini-private-buyer.compact line 166 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('ownerOf',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 166 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._ownerOf_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
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
                                     'mini-private-buyer.compact line 173 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('tokenCertificate',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 173 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._tokenCertificate_1(context,
                                                  partialProofData,
                                                  tokenId_0);
        partialProofData.output = { value: _descriptor_11.toValue(result_0), alignment: _descriptor_11.alignment() };
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
                                     'mini-private-buyer.compact line 180 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('tokenPrice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 180 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._tokenPrice_1(context, partialProofData, tokenId_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
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
                                     'mini-private-buyer.compact line 187 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('setTokenPrice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 187 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     tokenId_0)
        }
        if (!(typeof(price_0) === 'bigint' && price_0 >= 0n && price_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('setTokenPrice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'mini-private-buyer.compact line 187 char 1',
                                     'Uint<0..18446744073709551616>',
                                     price_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenId_0).concat(_descriptor_1.toValue(price_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setTokenPrice_0(context,
                                               partialProofData,
                                               tokenId_0,
                                               price_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      mint: this.circuits.mint,
      burn: this.circuits.burn,
      addToPool: this.circuits.addToPool,
      removeFromPool: this.circuits.removeFromPool,
      purchaseNFT: this.circuits.purchaseNFT,
      withdrawSellerFunds: this.circuits.withdrawSellerFunds,
      proofOwnership: this.circuits.proofOwnership,
      burnPurchased: this.circuits.burnPurchased,
      balanceOf: this.circuits.balanceOf,
      ownerOf: this.circuits.ownerOf,
      tokenCertificate: this.circuits.tokenCertificate,
      tokenPrice: this.circuits.tokenPrice,
      setTokenPrice: this.circuits.setTokenPrice
    };
    this.provableCircuits = {
      mint: this.circuits.mint,
      burn: this.circuits.burn,
      addToPool: this.circuits.addToPool,
      removeFromPool: this.circuits.removeFromPool,
      purchaseNFT: this.circuits.purchaseNFT,
      withdrawSellerFunds: this.circuits.withdrawSellerFunds,
      proofOwnership: this.circuits.proofOwnership,
      burnPurchased: this.circuits.burnPurchased,
      balanceOf: this.circuits.balanceOf,
      ownerOf: this.circuits.ownerOf,
      tokenCertificate: this.circuits.tokenCertificate,
      tokenPrice: this.circuits.tokenPrice,
      setTokenPrice: this.circuits.setTokenPrice
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
    let stateValue_2 = __compactRuntime.StateValue.newArray();
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
    state_0.setOperation('mint', new __compactRuntime.ContractOperation());
    state_0.setOperation('burn', new __compactRuntime.ContractOperation());
    state_0.setOperation('addToPool', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeFromPool', new __compactRuntime.ContractOperation());
    state_0.setOperation('purchaseNFT', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdrawSellerFunds', new __compactRuntime.ContractOperation());
    state_0.setOperation('proofOwnership', new __compactRuntime.ContractOperation());
    state_0.setOperation('burnPurchased', new __compactRuntime.ContractOperation());
    state_0.setOperation('balanceOf', new __compactRuntime.ContractOperation());
    state_0.setOperation('ownerOf', new __compactRuntime.ContractOperation());
    state_0.setOperation('tokenCertificate', new __compactRuntime.ContractOperation());
    state_0.setOperation('tokenPrice', new __compactRuntime.ContractOperation());
    state_0.setOperation('setTokenPrice', new __compactRuntime.ContractOperation());
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
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(0n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(''),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(''),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(0n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(2n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(3n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(4n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(5n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(6n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(7n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(8n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(9n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(10n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(11n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(12n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(13n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(14n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    this._initialize_0(context, partialProofData, _name_0, _symbol_0);
    this._initialize_2(context, partialProofData);
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
  _nativeToken_0() {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _shieldedBurnAddress_0() {
    return this._left_0({ bytes: new Uint8Array(32) });
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                partialProofData,
                                                                                                [
                                                                                                 { dup: { n: 2 } },
                                                                                                 { idx: { cached: true,
                                                                                                          pushPath: false,
                                                                                                          path: [
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_24.toValue(0n),
                                                                                                                            alignment: _descriptor_24.alignment() } }] } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_24.toValue(0n),
                                                                                                             alignment: _descriptor_24.alignment() } }] } },
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
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(2n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_0(recipient_0.right.bytes, selfAddr_0.bytes))
    {
      const tmp_2 = this._coinCommitment_0(output_0, recipient_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                                                alignment: _descriptor_3.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    if (this._equal_1(change_0, 0n)) {
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
                                                           value: { value: _descriptor_24.toValue(2n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(cm_0),
                                                                                                alignment: _descriptor_3.alignment() }).encode() } },
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
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(cm_0),
                                                                                                alignment: _descriptor_3.alignment() }).encode() } },
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
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_19, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_16, value_0);
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
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_4.toValue(result_0),
      alignment: _descriptor_4.alignment()
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
  _initialize_0(context, partialProofData, name__0, symbol__0) {
    this._initialize_1(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(0n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(name__0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(symbol__0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _balanceOf_0(context, partialProofData, owner_0) {
    this._assertInitialized_0(context, partialProofData);
    if (!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_24.toValue(1n),
                                                                                               alignment: _descriptor_24.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_24.toValue(2n),
                                                                                               alignment: _descriptor_24.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(owner_0),
                                                                                                                           alignment: _descriptor_6.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      return 0n;
    } else {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(2n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_6.toValue(owner_0),
                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  }
  _ownerOf_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    return this.__requireOwned_0(context, partialProofData, tokenId_0);
  }
  _tokenCertificate_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    this.__requireOwned_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(3n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token does not exist');
    return _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_24.toValue(3n),
                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
  }
  _tokenPrice_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    this.__requireOwned_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(4n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token does not exist');
    return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_24.toValue(1n),
                                                                                                 alignment: _descriptor_24.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_24.toValue(4n),
                                                                                                 alignment: _descriptor_24.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
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
    this._assertInitialized_0(context, partialProofData);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_14.toValue(tmp_0),
                                                                alignment: _descriptor_14.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    this.__mint_0(context, partialProofData, to_0, tokenId_0, tokenCertificate_0);
    this.__setTokenPrice_0(context, partialProofData, tokenId_0, price_0);
    return [];
  }
  _burn_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    this.__burn_0(context, partialProofData, tokenId_0);
    return [];
  }
  __update_0(context, partialProofData, to_0, tokenId_0) {
    const from__0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    if (!this._isKeyOrAddressZero_0(from__0)) {
      let t_0;
      const newBalance_0 = (t_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                            partialProofData,
                                                                                            [
                                                                                             { dup: { n: 0 } },
                                                                                             { idx: { cached: false,
                                                                                                      pushPath: false,
                                                                                                      path: [
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_24.toValue(1n),
                                                                                                                        alignment: _descriptor_24.alignment() } },
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_24.toValue(2n),
                                                                                                                        alignment: _descriptor_24.alignment() } }] } },
                                                                                             { idx: { cached: false,
                                                                                                      pushPath: false,
                                                                                                      path: [
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_6.toValue(from__0),
                                                                                                                        alignment: _descriptor_6.alignment() } }] } },
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
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(2n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(from__0),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(newBalance_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    if (!this._isKeyOrAddressZero_0(to_0)) {
      if (!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_24.toValue(1n),
                                                                                                 alignment: _descriptor_24.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_24.toValue(2n),
                                                                                                 alignment: _descriptor_24.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(to_0),
                                                                                                                             alignment: _descriptor_6.alignment() }).encode() } },
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
                                                             value: { value: _descriptor_24.toValue(1n),
                                                                      alignment: _descriptor_24.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_24.toValue(2n),
                                                                      alignment: _descriptor_24.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(to_0),
                                                                                                  alignment: _descriptor_6.alignment() }).encode() } },
                                           { push: { storage: true,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                           { ins: { cached: false, n: 1 } },
                                           { ins: { cached: true, n: 2 } }]);
      }
      const newBalance_1 = ((t1) => {
                             if (t1 > 340282366920938463463374607431768211455n) {
                               throw new __compactRuntime.CompactError('NonFungibleToken.compact line 151 char 26: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                             }
                             return t1;
                           })(_descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_24.toValue(1n),
                                                                                                                    alignment: _descriptor_24.alignment() } },
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_24.toValue(2n),
                                                                                                                    alignment: _descriptor_24.alignment() } }] } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_6.toValue(to_0),
                                                                                                                    alignment: _descriptor_6.alignment() } }] } },
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
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(2n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(to_0),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(newBalance_1),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(to_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
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
                                            tokenId_0);
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
                                            tokenId_0);
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(previousOwner_0),
                            'NonFungibleToken: Invalid Sender');
    return [];
  }
  __requireOwned_0(context, partialProofData, tokenId_0) {
    const owner_0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(owner_0),
                            'NonFungibleToken: Nonexistent Token');
    return owner_0;
  }
  __ownerOf_0(context, partialProofData, tokenId_0) {
    if (!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_24.toValue(1n),
                                                                                               alignment: _descriptor_24.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_24.toValue(1n),
                                                                                               alignment: _descriptor_24.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                           alignment: _descriptor_0.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      return this._shieldedBurnAddress_0();
    } else {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(3n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tokenCertificate_0),
                                                                                              alignment: _descriptor_11.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(4n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(price_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(5n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(5n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_0(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(5n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _isKeyOrAddressZero_0(keyOrAddress_0) {
    if (this._isContractAddress_0(keyOrAddress_0)) {
      return this._equal_2({ bytes: new Uint8Array(32) }, keyOrAddress_0.right);
    } else {
      return this._equal_3({ bytes: new Uint8Array(32) }, keyOrAddress_0.left);
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
                                 'NFTPool.compact line 40 char 3',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_3.toValue(result_0),
      alignment: _descriptor_3.alignment()
    });
    return result_0;
  }
  _initialize_2(context, partialProofData) {
    this._initialize_3(context, partialProofData); return [];
  }
  _addToPool_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_1(context, partialProofData);
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(6n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'NFTPool: Token already listed');
    __compactRuntime.assert(!this.__isTokenSold_0(context,
                                                  partialProofData,
                                                  tokenId_0),
                            'NFTPool: Token already sold');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(6n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _removeFromPool_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_1(context, partialProofData);
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(6n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'NFTPool: Token not listed');
    __compactRuntime.assert(!this.__isTokenSold_0(context,
                                                  partialProofData,
                                                  tokenId_0),
                            'NFTPool: Token already sold');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(6n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _purchaseNFT_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_1(context, partialProofData);
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(6n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'NFTPool: Token not listed');
    __compactRuntime.assert(!this.__isTokenSold_0(context,
                                                  partialProofData,
                                                  tokenId_0),
                            'NFTPool: Token already sold');
    const nonce_0 = this._wit_secretNonce_0(context, partialProofData);
    const callerAsEither_0 = { is_left: true,
                               left:
                                 this._ownPublicKey_0(context, partialProofData),
                               right:
                                 { bytes:
                                     new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } };
    const id_0 = this.__computeOwnerId_0(callerAsEither_0, nonce_0);
    const ownerCommitment_0 = this.__computeOwnerCommitment_0(id_0,
                                                              _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                        partialProofData,
                                                                                                                        [
                                                                                                                         { dup: { n: 0 } },
                                                                                                                         { idx: { cached: false,
                                                                                                                                  pushPath: false,
                                                                                                                                  path: [
                                                                                                                                         { tag: 'value',
                                                                                                                                           value: { value: _descriptor_24.toValue(1n),
                                                                                                                                                    alignment: _descriptor_24.alignment() } },
                                                                                                                                         { tag: 'value',
                                                                                                                                           value: { value: _descriptor_24.toValue(8n),
                                                                                                                                                    alignment: _descriptor_24.alignment() } }] } },
                                                                                                                         { popeq: { cached: true,
                                                                                                                                    result: undefined } }]).value));
    const tmp_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_24.toValue(1n),
                                                                                                        alignment: _descriptor_24.alignment() } },
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_24.toValue(8n),
                                                                                                        alignment: _descriptor_24.alignment() } }] } },
                                                                             { popeq: { cached: true,
                                                                                        result: undefined } }]).value);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(9n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(11n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(7n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(6n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(8n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_14.toValue(tmp_1),
                                                                alignment: _descriptor_14.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    return ownerCommitment_0;
  }
  _storeSellerPayment_0(context, partialProofData, seller_0, coin_0, price_0) {
    const tmp_0 = this._right_0(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                          partialProofData,
                                                                                          [
                                                                                           { dup: { n: 2 } },
                                                                                           { idx: { cached: true,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_24.toValue(0n),
                                                                                                                      alignment: _descriptor_24.alignment() } }] } },
                                                                                           { popeq: { cached: true,
                                                                                                      result: undefined } }]).value));
    __compactRuntime.hasCoinCommitment(context, coin_0, tmp_0) ? __compactRuntime.queryLedgerState(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: true,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_24.toValue(1n),
                                                                                                                               alignment: _descriptor_24.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_24.toValue(12n),
                                                                                                                               alignment: _descriptor_24.alignment() } }] } },
                                                                                                    { push: { storage: false,
                                                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(seller_0),
                                                                                                                                                           alignment: _descriptor_6.alignment() }).encode() } },
                                                                                                    { dup: { n: 7 } },
                                                                                                    { push: { storage: false,
                                                                                                              value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                           { value: _descriptor_12.toValue(coin_0),
                                                                                                                                                             alignment: _descriptor_12.alignment() },
                                                                                                                                                           { value: _descriptor_6.toValue(tmp_0),
                                                                                                                                                             alignment: _descriptor_6.alignment() }
                                                                                                                                                         )).encode() } },
                                                                                                    { idx: { cached: true,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_24.toValue(1n),
                                                                                                                               alignment: _descriptor_24.alignment() } },
                                                                                                                    { tag: 'stack' }] } },
                                                                                                    { push: { storage: false,
                                                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(coin_0),
                                                                                                                                                           alignment: _descriptor_12.alignment() }).encode() } },
                                                                                                    { swap: { n: 0 } },
                                                                                                    { concat: { cached: true,
                                                                                                                n: 91 } },
                                                                                                    { ins: { cached: false,
                                                                                                             n: 1 } },
                                                                                                    { ins: { cached: true,
                                                                                                             n: 2 } }]) : (() => { throw new __compactRuntime.CompactError(`NFTPool.compact line 91 char 5: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    if (_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_24.toValue(13n),
                                                                                              alignment: _descriptor_24.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(seller_0),
                                                                                                                          alignment: _descriptor_6.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      const currentAmount_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_24.toValue(1n),
                                                                                                                    alignment: _descriptor_24.alignment() } },
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_24.toValue(13n),
                                                                                                                    alignment: _descriptor_24.alignment() } }] } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_6.toValue(seller_0),
                                                                                                                    alignment: _descriptor_6.alignment() } }] } },
                                                                                         { popeq: { cached: false,
                                                                                                    result: undefined } }]).value);
      const newAmount_0 = ((t1) => {
                            if (t1 > 340282366920938463463374607431768211455n) {
                              throw new __compactRuntime.CompactError('NFTPool.compact line 96 char 25: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                            }
                            return t1;
                          })(currentAmount_0 + price_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(13n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(seller_0),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(newAmount_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    } else {
      const initialAmount_0 = price_0;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(13n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(seller_0),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(initialAmount_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  _withdrawSellerFunds_0(context, partialProofData) {
    this._assertInitialized_1(context, partialProofData);
    const caller_0 = this._left_0(this._ownPublicKey_0(context, partialProofData));
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(12n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(caller_0),
                                                                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'NFTPool: No balance to withdraw');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(13n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(caller_0),
                                                                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'NFTPool: No amount to withdraw');
    const balance_0 = _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_24.toValue(1n),
                                                                                                             alignment: _descriptor_24.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_24.toValue(12n),
                                                                                                             alignment: _descriptor_24.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_6.toValue(caller_0),
                                                                                                             alignment: _descriptor_6.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value);
    const amount_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_24.toValue(1n),
                                                                                                           alignment: _descriptor_24.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_24.toValue(13n),
                                                                                                           alignment: _descriptor_24.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_6.toValue(caller_0),
                                                                                                           alignment: _descriptor_6.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    __compactRuntime.assert(!this._equal_4(amount_0, 0n),
                            'NFTPool: Zero balance');
    const send_result_0 = this._sendShielded_0(context,
                                               partialProofData,
                                               balance_0,
                                               caller_0,
                                               amount_0);
    if (!this._equal_5(send_result_0.change.value.value, 0n)) {
      const tmp_0 = send_result_0.change.value;
      const tmp_1 = this._right_0(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                            partialProofData,
                                                                                            [
                                                                                             { dup: { n: 2 } },
                                                                                             { idx: { cached: true,
                                                                                                      pushPath: false,
                                                                                                      path: [
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_24.toValue(0n),
                                                                                                                        alignment: _descriptor_24.alignment() } }] } },
                                                                                             { popeq: { cached: true,
                                                                                                        result: undefined } }]).value));
      __compactRuntime.hasCoinCommitment(context, tmp_0, tmp_1) ? __compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: true,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_24.toValue(1n),
                                                                                                                                alignment: _descriptor_24.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_24.toValue(12n),
                                                                                                                                alignment: _descriptor_24.alignment() } }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(caller_0),
                                                                                                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                                                                                                     { dup: { n: 7 } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                            { value: _descriptor_12.toValue(tmp_0),
                                                                                                                                                              alignment: _descriptor_12.alignment() },
                                                                                                                                                            { value: _descriptor_6.toValue(tmp_1),
                                                                                                                                                              alignment: _descriptor_6.alignment() }
                                                                                                                                                          )).encode() } },
                                                                                                     { idx: { cached: true,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_24.toValue(1n),
                                                                                                                                alignment: _descriptor_24.alignment() } },
                                                                                                                     { tag: 'stack' }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                                                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                                                                                                     { swap: { n: 0 } },
                                                                                                     { concat: { cached: true,
                                                                                                                 n: 91 } },
                                                                                                     { ins: { cached: false,
                                                                                                              n: 1 } },
                                                                                                     { ins: { cached: true,
                                                                                                              n: 2 } }]) : (() => { throw new __compactRuntime.CompactError(`NFTPool.compact line 121 char 7: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    } else {
      const tmp_2 = { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n };
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(12n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(caller_0),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(tmp_2),
                                                                                                alignment: _descriptor_13.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    const tmp_3 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(13n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(caller_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_3),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _proofOwnership_0(context, partialProofData, ownerCommitment_0, challenge_0) {
    this._assertInitialized_1(context, partialProofData);
    const isOwner_0 = this.__isCommitmentOwner_0(context,
                                                 partialProofData,
                                                 ownerCommitment_0);
    __compactRuntime.assert(isOwner_0, 'NFTPool: Not the owner');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(10n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(ownerCommitment_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(challenge_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _recordBurn_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_1(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(11n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = new Uint8Array(32);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(7n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  __computeOwnerCommitment_0(id_0, counter_0) {
    return this._persistentHash_2([id_0,
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        counter_0,
                                                                        'NFTPool.compact line 157 char 19'),
                                   new Uint8Array([80, 114, 105, 118, 97, 116, 101, 66, 117, 121, 101, 114, 58, 32, 115, 104, 105, 101, 108, 100, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])]);
  }
  __computeOwnerId_0(pk_0, nonce_0) {
    __compactRuntime.assert(pk_0.is_left,
                            'NFTPool: contract address owners are not yet supported');
    return this._persistentHash_1([pk_0.left.bytes, nonce_0]);
  }
  __isTokenSold_0(context, partialProofData, tokenId_0) {
    if (_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_24.toValue(11n),
                                                                                              alignment: _descriptor_24.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(11n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    } else {
      return false;
    }
  }
  __isCommitmentOwner_0(context, partialProofData, ownerCommitment_0) {
    const nonce_0 = this._wit_secretNonce_0(context, partialProofData);
    const callerAsEither_0 = { is_left: true,
                               left:
                                 this._ownPublicKey_0(context, partialProofData),
                               right:
                                 { bytes:
                                     new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } };
    const id_0 = this.__computeOwnerId_0(callerAsEither_0, nonce_0);
    const counter_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(1n),
                                                                                                            alignment: _descriptor_24.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(9n),
                                                                                                            alignment: _descriptor_24.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_3.toValue(ownerCommitment_0),
                                                                                                            alignment: _descriptor_3.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    const ownerCommitmentCalculated_0 = this.__computeOwnerCommitment_0(id_0,
                                                                        counter_0);
    const isOwner_0 = this._equal_6(ownerCommitmentCalculated_0,
                                    ownerCommitment_0);
    return isOwner_0;
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
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(14n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_1(context, partialProofData) {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(14n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_1(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(14n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _mint_1(context,
          partialProofData,
          to_0,
          tokenId_0,
          tokenCertificate_0,
          price_0)
  {
    return this._mint_0(context,
                        partialProofData,
                        to_0,
                        tokenId_0,
                        tokenCertificate_0,
                        price_0);
  }
  _burn_1(context, partialProofData, tokenId_0) {
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(6n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Token must be unlisted before burning');
    if (_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_24.toValue(11n),
                                                                                              alignment: _descriptor_24.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_24.toValue(11n),
                                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value),
                              'Sold tokens must be burned by commitment owner');
    }
    return this._burn_0(context, partialProofData, tokenId_0);
  }
  _addToPool_1(context, partialProofData, tokenId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(3n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token not found');
    this._addToPool_0(context, partialProofData, tokenId_0);
    return [];
  }
  _removeFromPool_1(context, partialProofData, tokenId_0) {
    this._removeFromPool_0(context, partialProofData, tokenId_0); return [];
  }
  _purchaseNFT_1(context, partialProofData, tokenId_0, coin_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(4n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token price not set');
    const price_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_24.toValue(1n),
                                                                                                          alignment: _descriptor_24.alignment() } },
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_24.toValue(4n),
                                                                                                          alignment: _descriptor_24.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    let t_0;
    __compactRuntime.assert((t_0 = coin_0.value, t_0 >= price_0),
                            'Insufficient payment');
    __compactRuntime.assert(this._equal_7(coin_0.color, this._nativeToken_0()),
                            'Invalid coin provided');
    this._receiveShielded_0(context, partialProofData, coin_0);
    const seller_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_24.toValue(1n),
                                                                                                           alignment: _descriptor_24.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_24.toValue(1n),
                                                                                                           alignment: _descriptor_24.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    this._storeSellerPayment_0(context,
                               partialProofData,
                               seller_0,
                               coin_0,
                               price_0);
    return this._purchaseNFT_0(context, partialProofData, tokenId_0);
  }
  _withdrawSellerFunds_1(context, partialProofData) {
    this._withdrawSellerFunds_0(context, partialProofData); return [];
  }
  _proofOwnership_1(context, partialProofData, ownerCommitment_0, challenge_0) {
    return this._proofOwnership_0(context,
                                  partialProofData,
                                  ownerCommitment_0,
                                  challenge_0);
  }
  _burnPurchased_0(context,
                   partialProofData,
                   ownerCommitment_0,
                   tokenId_0,
                   challenge_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(10n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(ownerCommitment_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'No ownership proof found');
    const storedChallenge_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_24.toValue(1n),
                                                                                                                    alignment: _descriptor_24.alignment() } },
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_24.toValue(10n),
                                                                                                                    alignment: _descriptor_24.alignment() } }] } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_3.toValue(ownerCommitment_0),
                                                                                                                    alignment: _descriptor_3.alignment() } }] } },
                                                                                         { popeq: { cached: false,
                                                                                                    result: undefined } }]).value);
    __compactRuntime.assert(this._equal_8(storedChallenge_0, challenge_0),
                            'Challenge does not match ownership proof');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(1n),
                                                                                                                  alignment: _descriptor_24.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(7n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Token not purchased');
    const storedCommitment_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_24.toValue(7n),
                                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(tokenId_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value);
    __compactRuntime.assert(this._equal_9(storedCommitment_0, ownerCommitment_0),
                            'Token not owned by this commitment');
    this._recordBurn_0(context, partialProofData, tokenId_0);
    this._burn_0(context, partialProofData, tokenId_0);
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
  _setTokenPrice_0(context, partialProofData, tokenId_0, price_0) {
    this.__setTokenPrice_0(context, partialProofData, tokenId_0, price_0);
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_3(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
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
    get NonFungibleToken__name() {
      return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(0n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(0n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get NonFungibleToken__symbol() {
      return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(0n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get NonFungibleToken__certificatesCreatedCounter() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(0n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    NonFungibleToken__owners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
                                     'NonFungibleToken.compact line 72 char 3',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'NonFungibleToken.compact line 72 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__balances: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
                                     'NonFungibleToken.compact line 74 char 3',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(key_0),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
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
                                     'NonFungibleToken.compact line 74 char 3',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(key_0),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_6.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__tokenToCertificate: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(3n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(3n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
                                     'NonFungibleToken.compact line 76 char 3',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(3n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'NonFungibleToken.compact line 76 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_24.toValue(1n),
                                                                                                      alignment: _descriptor_24.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_24.toValue(3n),
                                                                                                      alignment: _descriptor_24.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_11.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NonFungibleToken__tokenToPrice: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(4n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(4n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
                                     'NonFungibleToken.compact line 78 char 3',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(4n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'NonFungibleToken.compact line 78 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(4n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    NFTPool__pool: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(6n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(6n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'bigint' && elem_0 >= 0n && elem_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'NFTPool.compact line 20 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(6n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    NFTPool__nftOwnerCommitment: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(7n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(7n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
                                     'NFTPool.compact line 22 char 3',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(7n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'NFTPool.compact line 22 char 3',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     key_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(7n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get NFTPool__purchaseCounter() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(1n),
                                                                                                   alignment: _descriptor_24.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(8n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    NFTPool__tokenSold: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(11n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(11n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
                                     'NFTPool.compact line 30 char 3',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(11n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'NFTPool.compact line 30 char 3',
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
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(11n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[11];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
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
