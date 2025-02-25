import { Network } from './network';

export const COIN_TEMPLATE_BYTECODE = {
  [Network.TESTNET]:
    'a11ceb0b060000000a01000e020e320340520492011405a601c90107ef02940308830680010683075a0add07050ce2079403001e03140118020c021f022002210006020001000c0001020c0001030c0001040c00010a000002050701000003010c01000103070c01000105080200060907000013000100010b170100010d121500010f121600011012130001111801010001160e0f0100011c100100021d06070100030e090a010203150d01010004190601010c041a1401010c051b0b0c000617040500080509080a0806080c130c150c1605080b190b1a02080007080900190a0a0208000a030a03070b080108000a030a030708050a010a010a010a0a020a010a020a0a020a020a0a020a020a030208020b07010800050b0801080008050103010a0201080a010900010b06010900010800070900020a020a020a020b0601080a070809020b080109000b0701090001060809010504070b080109000305070809020b08010900070809020802080502070805030101020708050708090108040209000501080101080302070805070802020708020805010802010b07010800074275726e4361700c436f696e4d657461646174611349505854726561737572795374616e646172640b4d65746164617461436170074d696e74436170064f7074696f6e0854454d504c4154450b5472656173757279436170095478436f6e746578740355726c075769746e65737311616c6c6f775f7075626c69635f6275726e04636f696e0f6372656174655f6275726e5f6361700f6372656174655f63757272656e6379136372656174655f6d657461646174615f6361700f6372656174655f6d696e745f6361700f64657374726f795f7769746e6573730b64756d6d795f6669656c6404696e6974116970785f636f696e5f7374616e64617264116d696e745f616e645f7472616e73666572036e6577156e65775f756e736166655f66726f6d5f6279746573066f7074696f6e137075626c69635f73686172655f6f626a6563740f7075626c69635f7472616e736665720673656e646572127365745f6d6178696d756d5f737570706c7904736f6d650874656d706c617465087472616e736665720a74785f636f6e746578740375726c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000203979c0d3fac9c7cd89bc3b0b8de0aff4f23369be980b789b06c1b104f90eff30a0a02320404544d504c0d54656d706c61746520436f696e1954656d706c61746520436f696e204465736372697074696f6e0375726c0a010504000000000a031903000000000000000000000000000000000000000000000000000201120100000000029a010b000c0307020c140e14060000000000000000420314330c1507000c120e120600000000000000004204140c1307000c100e100601000000000000004204140c1107000c0d0e0d0602000000000000004204140c0f07000c020b030b150b130b110b0f0e02060300000000000000420414110e38000a0138010c170c190a012e110d0c1807020c040e040601000000000000004203140600000000000000002404490d190c0607020c050b060e050601000000000000004203140a180a0138020b190a0138030c1a0c1607020c070e070602000000000000004203140600000000000000002404610d1a0c0907020c080b090e08060200000000000000420314110707010c0a0e0a060000000000000000421114046d0d1a0a0111040a18380407010c0b0e0b06010000000000000042111404790d1a0a0111020a18380507010c0c0e0c0602000000000000004211140486010d1a0b0111030b1838060588010b010107010c0e0e0e0603000000000000004211140492010d1a0d1611010d160b1a38070b1638080b1738090200',
  [Network.MAINNET]:
    'a11ceb0b060000000a01000e020e320340520492011405a601c90107ef0294030883066006e3065a0abd07050cc2079403001e00140118020c021f022002210006020001000c0001020c0001030c0001040c00010a000002050701000003010c01000103070c01000105080200060907000013000100010b170100010d121500010f121600011012130001111801010001160e0f0100011c100100021d06070100030e090a010203150d01010004190601010c041a1401010c051b0b0c000617040500080509080a0806080c130c150c1605080b190b1a02080007080900190a0a0208000a030a03070b080108000a030a030708050a010a010a010a0a020a010a020a0a020a020a0a020a020a030208020b07010800050b0801080008050103010a0201080a010900010b06010900010800070900020a020a020a020b0601080a070809020b080109000b0701090001060809010504070b080109000305070809020b08010900070809020802080502070805030101020708050708090108040209000501080101080302070805070802020708020805010802010b07010800074275726e4361700c436f696e4d657461646174611349505854726561737572795374616e646172640b4d65746164617461436170074d696e74436170064f7074696f6e0854454d504c4154450b5472656173757279436170095478436f6e746578740355726c075769746e65737311616c6c6f775f7075626c69635f6275726e04636f696e0f6372656174655f6275726e5f6361700f6372656174655f63757272656e6379136372656174655f6d657461646174615f6361700f6372656174655f6d696e745f6361700f64657374726f795f7769746e6573730b64756d6d795f6669656c6404696e6974116970785f636f696e5f7374616e64617264116d696e745f616e645f7472616e73666572036e6577156e65775f756e736166655f66726f6d5f6279746573066f7074696f6e137075626c69635f73686172655f6f626a6563740f7075626c69635f7472616e736665720673656e646572127365745f6d6178696d756d5f737570706c7904736f6d650874656d706c617465087472616e736665720a74785f636f6e746578740375726c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020a0a02320404544d504c0d54656d706c61746520436f696e1954656d706c61746520436f696e204465736372697074696f6e0375726c0a010504000000000a031903000000000000000000000000000000000000000000000000000201120100000000029a010b000c0307020c140e14060000000000000000420314330c1507000c120e120600000000000000004204140c1307000c100e100601000000000000004204140c1107000c0d0e0d0602000000000000004204140c0f07000c020b030b150b130b110b0f0e02060300000000000000420414110e38000a0138010c170c190a012e110d0c1807020c040e040601000000000000004203140600000000000000002404490d190c0607020c050b060e050601000000000000004203140a180a0138020b190a0138030c1a0c1607020c070e070602000000000000004203140600000000000000002404610d1a0c0907020c080b090e08060200000000000000420314110707010c0a0e0a060000000000000000421114046d0d1a0a0111040a18380407010c0b0e0b06010000000000000042111404790d1a0a0111020a18380507010c0c0e0c0602000000000000004211140486010d1a0b0111030b1838060588010b010107010c0e0e0e0603000000000000004211140492010d1a0d1611010d160b1a38070b1638080b1738090200',
};
