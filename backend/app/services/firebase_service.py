import firebase_admin
from firebase_admin import credentials, auth as firebase_auth

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "remad-d6495",
  "private_key_id": "8d3483fe4193b9bf19e9b1ae3a6b21e2d2c507c6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDg0mao+jXLw9pL\njJavNCvH23J8XoJa6V0008vedP2Hffuft82jyFZnaN5fAN0vPfowL+MIpDuIznM+\n8/0/soUhUoT2nR5idLiqT79unYuj1tap8Htx2dW5rV6xMJ38i0jXzbx2sHRQ7o8x\nBBSntENPiR4jfuaDHZ9AZ47iEbHBInqfZ0jd2HEUudPFNAeJ5PDBfaclWhDl8Xjx\nd7XPFF9651oQ2rhzH9u/kkD0ljusnxe5z4OogPmuBYUCKlPWRtAeAgOCr4BVh7xe\nngxx4fY8WKAZUdVGfR4LgstBDoLm8DHRzGIU16L8kQqhtgY0EyTNS1E/TRcDFkaz\npm/ljA3BAgMBAAECgf80ikTWHgIwJBCDhtiU3EFr93C7MHk8916KzE8AhVu5KV0V\nJBFH6vPKrCLVyFN7O464j4EB0UuhHPGmCVXSEbC4bKOKJYNnuqDTf9vQxYz2+SEZ\n4tkkiFtMZanS4MIzaJGxM4nmdow/hIO1HQGKJauzi2orNCNfQ8vdIrhCqQ6vhZH3\nUYZKuvnXlOIIDA5P96/b4wUCpKOc7/HjLXHSnxmN13QmafrxJGrt39Tbdzhj3Bsm\ndpkZPd3WA7Hw5GqFqTNo2XHun5iaWxIfZf8yaWOr6mTNRNkzOQsL1Zi0/f6sGWRC\naNeI53KD8PL69H1z/xwQpDm5a9u0SrQT+geVd5kCgYEA9mrqGEchlfaX0xUe5G4+\nlh4BIjIee9jqQJfVvaRp8w/l1ks1FTDjll6yOV68d9DkYqFZn+CXQ/HGuMEM5oDh\nOcaD2SrrH2o1OWg51RXYCKbucahO0CreEmcKD9mD71NZTe02v7hNPp4CDVrAP1R5\nUpmwWsrMHfnTr5E1fKzNjHkCgYEA6ZCAQjlZQsPoZCW/Y1RIPL5ARiSg3PrjYdjG\ngzuNiooJ7Nv2cOfpork84jeBSxPDyWhoKJ3yeiPoMhnhvf25/yno7s0M04gDCJfL\n6LQq2nJmoGsu6N/FZ63qD7IFJHd2w8fRpCmL212ZY0l/X0jgzIkVhA45w5UXbRyo\niXRQqYkCgYEAgW73N3llctfsN7vIVkRyK3fnMIcS7AqsQPGAG/TYkguvtjga0d60\nLK/g/bF9XZIj5IrMAOZ/jfjZYQJGPG1F4Isdhly80+t9uYG9nueyahkE9j5p534c\n152380tVucgWCJCpSVsNd+6XNVyNzrYYZALGV2pefQBU6MtlRO+fqEECgYEAsO5k\nGsay1Z7utp7Zwvcf2dQNgJVSvtPX2FGM3/EHIgG7zxA6OgGUvU4xzvRZH3SThklv\nTgWIn/n/daShm3lPovoumGgA5WVNVv8W2utQ4zZyg+duG78YHZhjjQxAVQWilGEU\ncJWAeucGwW317UqZ8JeQEv9rxrt0iZWCHs5cJHECgYEA8UbHR1NdS3MMnGpEL7Op\nJno5IzX3daFcbOjCzfNqV0PsCHpHJf+zBLr2/18nlGiKGV2YWJw4MHrZlWxFijcS\nLRc1GhrUWONANju2ne2qvGv+WlDg9e9TNW2H1S9Q/e5j3ojNjCzUeFrkWvDGxAOQ\nxAo+JtNcYpWZb6hRzD7ZcJw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@remad-d6495.iam.gserviceaccount.com",
  "client_id": "111565967978726833436",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40remad-d6495.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
})

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

def verify_firebase_token(token: str) -> dict:
    return firebase_auth.verify_id_token(token)
