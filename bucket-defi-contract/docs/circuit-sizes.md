erick@Erick:~/edda/bucket-defi-dapp/bucket-defi-contract$ npm run compact

> @eddalabs/bucket-defi-contract@0.1.0 compact
> compact compile +0.28.0 src/bucket-defi.compact src/managed/bucket-defi

Compiling 31 circuits:
Missing public parameters for k=12. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=12 [====================] 768.38 KiB / 768.38 KiB
  circuit "addCertificateToBucket" (k=11, rows=1655)  
  circuit "assertOnlyRole" (k=10, rows=693)  
  circuit "assertOwnVerification" (k=9, rows=284)  
  circuit "balanceOf" (k=10, rows=663)  
  circuit "burn" (k=10, rows=858)  
  circuit "claimCertificateReward" (k=15, rows=24944)  
  circuit "createBucket" (k=15, rows=22005)  
  circuit "grantRole" (k=11, rows=1605)  
  circuit "isUserVerified" (k=9, rows=305)  
  circuit "mint" (k=12, rows=2055)  
  circuit "ownerOf" (k=9, rows=334)  
  circuit "pauseAccessControl" (k=9, rows=419)  
  circuit "pauseBucketDEFI" (k=9, rows=426)  
  circuit "pauseIdentity" (k=9, rows=426)  
  circuit "pauseToken" (k=9, rows=426)  
  circuit "proofBucketOwnership" (k=14, rows=9279)  
  circuit "removeRoleAdmin" (k=10, rows=971)  
  circuit "removeUser" (k=10, rows=700)  
  circuit "renounceRole" (k=10, rows=746)  
  circuit "revokeRole" (k=11, rows=1473)  
  circuit "setRoleAdmin" (k=10, rows=971)  
  circuit "setTokenPrice" (k=10, rows=614)  
  circuit "setUser" (k=10, rows=700)  
  circuit "settleBucket" (k=14, rows=9519)  
  circuit "tokenCertificate" (k=9, rows=343)  
  circuit "tokenPrice" (k=9, rows=293)  
  circuit "unpauseAccessControl" (k=9, rows=413)  
  circuit "unpauseBucketDEFI" (k=9, rows=420)  
  circuit "unpauseIdentity" (k=9, rows=420)  