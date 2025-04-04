import { readFileSync } from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-saml';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    super({
      path: '/auth/saml/callback', // Assertion Consumer Service URL
      entryPoint: 'https://your-idp.com/saml/login',
      issuer: 'nestjs-saml-demo',
      cert: readFileSync(join(process.cwd(), 'certificates', 'cert.pem'), 'utf8'),
      privateCert: readFileSync(join(process.cwd(), 'certificates', 'key.pem'), 'utf8'),      
      // optional:
      // privateCert: fs.readFileSync('./cert/key.pem', 'utf-8'),
    });
  }

  validate(profile: any, done: Function) {
    const user = {
      id: profile.nameID,
      email:
        profile.email ||
        profile[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
      displayName: profile.displayName,
    };
    done(null, user);
  }
}
