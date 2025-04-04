import type { SamlConfig } from 'passport-saml';
import * as fs from 'fs';

const samlConfig: SamlConfig = {
  callbackUrl: 'http://localhost:3000/auth/saml/callback',
  entryPoint: 'https://idp.ssocircle.com/sso/SSOPOST/metaAlias/publicidp',
  issuer: 'nestjs-saml-demo',
  cert: fs.readFileSync('./certificates/cert.pem', 'utf8'),
  privateCert: fs.readFileSync('./certificates/key.pem', 'utf8'),
} as any;

const getSamlMetadata = require('passport-saml-metadata');
const metadata = getSamlMetadata({
  callbackUrl: 'http://localhost:3000/auth/saml/callback',
  issuer: 'nestjs-saml-demo',
  cert: fs.readFileSync('./certificates/cert.pem', 'utf8'),
});
