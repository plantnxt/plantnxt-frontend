#!/bin/bash

# PlantNxt IAM Permissions Setup Script

echo "🔐 Setting up IAM permissions for CloudFront and ACM..."

# Create IAM policy for CloudFront and ACM permissions
POLICY_JSON=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateDistribution",
                "cloudfront:GetDistribution",
                "cloudfront:UpdateDistribution",
                "cloudfront:DeleteDistribution",
                "cloudfront:ListDistributions",
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation",
                "cloudfront:ListInvalidations"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "acm:RequestCertificate",
                "acm:DescribeCertificate",
                "acm:ListCertificates",
                "acm:DeleteCertificate"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:GetBucketWebsite",
                "s3:PutBucketWebsite",
                "s3:PutBucketPolicy",
                "s3:PutBucketCors"
            ],
            "Resource": "arn:aws:s3:::plantnxt-frontend-mvp"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::plantnxt-frontend-mvp",
                "arn:aws:s3:::plantnxt-frontend-mvp/*"
            ]
        }
    ]
}
EOF
)

echo "📋 IAM Policy for CloudFront and ACM:"
echo "$POLICY_JSON"
echo ""

echo "🔧 To add these permissions, you have two options:"
echo ""
echo "Option 1: Create a new IAM policy and attach to your user"
echo "1. Go to AWS Console → IAM → Policies → Create Policy"
echo "2. Use JSON tab and paste the policy above"
echo "3. Name it: PlantNxtCloudFrontPolicy"
echo "4. Attach it to your user: dharama-mac"
echo ""
echo "Option 2: Use AWS CLI (if you have admin access)"
echo "1. Save the policy to a file:"
echo "   echo '$POLICY_JSON' > plantnxt-cloudfront-policy.json"
echo ""
echo "2. Create the policy:"
echo "   aws iam create-policy \\"
echo "     --policy-name PlantNxtCloudFrontPolicy \\"
echo "     --policy-document file://plantnxt-cloudfront-policy.json"
echo ""
echo "3. Attach to your user:"
echo "   aws iam attach-user-policy \\"
echo "     --user-name dharama-mac \\"
echo "     --policy-arn arn:aws:iam::501235162113:policy/PlantNxtCloudFrontPolicy"
echo ""
echo "After adding permissions, run: ./setup-custom-domain.sh"
