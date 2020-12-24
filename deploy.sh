npm run build
aws s3 sync dist/laughtrack s3://laughtertracker 
aws cloudfront create-invalidation --distribution-id E2P3BQS017IKFR --paths "/*"