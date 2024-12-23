import { bcs } from '@mysten/sui/bcs';
import { fromHex } from '@mysten/sui/utils';

import { COIN_TEMPLATE_BYTECODE } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ICreateCoin } from '@/views/home/create-coin/create-coin.types';

import * as template from '../move-bytecode-template';

const updateMetadata = (
  modifiedByteCode: Uint8Array,
  metadata: [string, string, string, string]
) =>
  template.update_constants(
    modifiedByteCode,
    bcs.vector(bcs.string()).serialize(metadata).toBytes(),
    bcs
      .vector(bcs.string())
      .serialize(['TMPL', 'Template Coin', 'Template Coin Description', 'url'])
      .toBytes(),
    'Vector(Vector(U8))'
  );

const updateSupply = (
  modifiedByteCode: Uint8Array,
  supply: [string, string, string]
) =>
  template.update_constants(
    modifiedByteCode,
    bcs.vector(bcs.u64()).serialize(supply).toBytes(),
    bcs.vector(bcs.u64()).serialize([0, 0, 0]).toBytes(),
    'Vector(U64)'
  );

const updateCaps = (
  modifiedByteCode: Uint8Array,
  caps: [boolean, boolean, boolean, boolean]
) =>
  template.update_constants(
    modifiedByteCode,
    bcs.vector(bcs.bool()).serialize(caps).toBytes(),
    bcs.vector(bcs.bool()).serialize([false, false, false, false]).toBytes(),
    'Vector(Bool)'
  );

export const getBytecode = (info: ICreateCoin) => {
  const bytecode = COIN_TEMPLATE_BYTECODE.testnet;

  const templateByteCode = fromHex(bytecode);

  const modifiedByteCode = template.update_identifiers(templateByteCode, {
    TEMPLATE: info.symbol.trim().toUpperCase().replaceAll(' ', '_'),
    template: info.symbol.trim().toLowerCase().replaceAll(' ', '_'),
  });

  let updated = updateMetadata(modifiedByteCode, [
    info.symbol,
    info.name,
    info.description ?? '',
    info.imageUrl ?? '',
  ]);

  updated = updateCaps(updated, [
    info.features.mintable,
    info.features.burnable,
    info.features.editable,
    info.features.canBurn,
  ]);

  updated = updateSupply(updated, [
    String(info.decimals),
    FixedPointMath.toBigNumber(info.supply, info.decimals).toFixed(0),
    FixedPointMath.toBigNumber(
      info.features.maxSupply || '0',
      info.decimals
    ).toFixed(0),
  ]);

  return updated;
};
