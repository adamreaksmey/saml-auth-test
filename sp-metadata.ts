import { ServiceProviderMetadata } from 'passport-saml';
import type { SamlConfig } from 'passport-saml';
import * as fs from 'fs';

const samlConfig: SamlOptions = {
  callbackUrl: 'http://localhost:3000/auth/saml/callback',
  entryPoint: 'https://idp.ssocircle.com/sso/SSOPOST/metaAlias/publicidp',
  issuer: 'nestjs-saml-demo',
  cert: fs.readFileSync('./cert.pem', 'utf8'),
  privateCert: fs.readFileSync('./key.pem', 'utf8'),
};

const { getSamlMetadata } = require('passport-saml-metadata');

getSamlMetadata(samlConfig, (err: any, metadata: string) => {
  if (err) throw err;
  fs.writeFileSync('./sp-metadata.xml', metadata);
});
