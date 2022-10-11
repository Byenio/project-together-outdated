export default {

    port: 1337,
    host: 'localhost',
    dbUri: `mongodb://admin:Win123@10.0.0.240:27017/project-together`,
    saltWorkFactor: 16,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5+ZIbwsqhBB3xc3ZIHP58G6R+
4JIdxn/3vOL/ONyTdOHhGQd21FiBV240UghTDoTAIydYz+2NYoqKFlRaw+JC6LMs
rVRSGZgqUvxX9O9VfYgZcroYaT1cyLW1k2IsND8a9tczOd4kDjpRQTKSMoEgqq0d
E0h1Ra/ue3xstXJelwIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQC5+ZIbwsqhBB3xc3ZIHP58G6R+4JIdxn/3vOL/ONyTdOHhGQd2
1FiBV240UghTDoTAIydYz+2NYoqKFlRaw+JC6LMsrVRSGZgqUvxX9O9VfYgZcroY
aT1cyLW1k2IsND8a9tczOd4kDjpRQTKSMoEgqq0dE0h1Ra/ue3xstXJelwIDAQAB
AoGABnEMjIWcuyMHXnufVzQZ5HaYpgRlSz664/vY6PoxObJMuJ1DUuxb/G7o1Esb
GrVgB7+v9zWMht8o6UuItHQgfB2nzs8x+XDLxc4p47JjHpATC1c83jF6aq61U30P
DVf5qSbnJglyVw/Jnz/WJMQsaHljDaAX1GOHHhheqwWhXlECQQDqXrpeC3nXtjc1
nRU+e0fYirUH10pH1cIfCyyq+FNtkrXYwW3quI4ZvYBqw8eg4sFd2VmooRo+sMIS
mAmtUNGzAkEAyyNzGUogWMCAF1ERD3Qr9Y5DARRD1DKU5alihVXz86uXWgwxDiVN
ifNWpnV9ZQ1+5nsB/Yx18LkR2kIPF+AljQJBAIKKRrXRIIlkxbWIC+gkVG0pPRHj
+UyvpBMUb0m/TQCwAbd8bZOaPhPaOCe/anaTNm7mfAjvyqV2YHJo2qL9a/8CQQDA
cq0wYFGUw4qWjG6lPWIIGObRtukrt1/o1DhKKcwcJYwV+0beJ+j1sFt/B//sJIT8
xbx1AQUbMboAFGVIMUphAkEAzh2c7PMdyeZJewt0bNI8Xwh/Goq8f+uqaRCh/bVq
FKrw8tD9fjBS8LnNWeJcV99YCS1QWZJ4Tdm1gVbYEuWyCQ==
-----END RSA PRIVATE KEY-----`

}