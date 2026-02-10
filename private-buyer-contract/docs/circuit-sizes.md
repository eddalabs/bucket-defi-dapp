erick@Erick:~/edda/bucket-defi-dapp/private-buyer-contract$ npm run compact

> @eddalabs/private-buyer-contract@0.1.0 compact
> compact compile +0.28.0 src/private-buyer.compact src/managed/private-buyer

Compiling 38 circuits:
Missing public parameters for k=11. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=11 [====================] 384.38 KiB / 384.38 KiB
Missing public parameters for k=10. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=10 [====================] 192.38 KiB / 192.38 KiB
Missing public parameters for k=9. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=9 [====================] 96.38 KiB / 96.38 KiB
Missing public parameters for k=13. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=13 [====================] 1.50 MiB / 1.50 MiB
Missing public parameters for k=14. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=14 [====================] 3.00 MiB / 3.00 MiB
Missing public parameters for k=15. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=15 [====================] 6.00 MiB / 6.00 MiB
Missing public parameters for k=17. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=17 [====================] 24.00 MiB / 24.00 MiB
Missing public parameters for k=18. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=18 [====================] 48.00 MiB / 48.00 MiB
Missing public parameters for k=16. Attempting to download from the host https://midnight-s3-fileshare-dev-eu-west-1.s3.eu-west-1.amazonaws.com/ - this is not a trusted service, the data will be verified.
Fetching public parameters for k=16 [====================] 12.00 MiB / 12.00 MiB
  circuit "_burnPurchasedToken" (k=11, rows=1893)  
  circuit "_executeBatchPurchase" (k=10, rows=672)  
  circuit "_getBatchTokenPrice" (k=9, rows=258)  
  circuit "_storeBatchSellerPayment" (k=13, rows=7296)  
  circuit "addToPool" (k=10, rows=989)  
  circuit "assertOnlyRole" (k=10, rows=693)  
  circuit "assertOwnVerification" (k=9, rows=284)  
  circuit "balanceOf" (k=10, rows=669)  
  circuit "burn" (k=10, rows=865)  
  circuit "burnPurchasedBatch10" (k=14, rows=14055)  
  circuit "burnPurchasedBatch20" (k=15, rows=27117)  
  circuit "burnPurchasedBatch5" (k=13, rows=7514)  
  circuit "grantRole" (k=11, rows=1571)  
  circuit "isUserVerified" (k=9, rows=305)  
  circuit "mint" (k=11, rows=2040)  
  circuit "ownerOf" (k=9, rows=337)  
  circuit "pauseAccessControl" (k=9, rows=419)  
  circuit "pauseIdentity" (k=9, rows=426)  
  circuit "pauseNFTPool" (k=9, rows=426)  
  circuit "pauseToken" (k=9, rows=426)  
  circuit "proofOwnership" (k=14, rows=9279)  
  circuit "purchaseBatch10" (k=17, rows=83798)  
  circuit "purchaseBatch20" (k=18, rows=152020)  
  circuit "purchaseBatch5" (k=16, rows=49697)  
  circuit "purchaseNFT" (k=15, rows=21884)  
  circuit "removeFromPool" (k=10, rows=984)  
  circuit "removeUser" (k=10, rows=700)  
  circuit "renounceRole" (k=10, rows=746)  
  circuit "revokeRole" (k=11, rows=1439)  