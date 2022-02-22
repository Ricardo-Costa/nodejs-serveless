# NodeJs Serveless Project

> Simple project using serveless framework to learning and test features.

**Install serveless CLI globally with NPM**

```bash
npm install -g serverless
```

**Create Project**

```bash
serverless create --template aws-nodejs --path nodejs-serveless
```

**Config Serveless**

```bash
serverless config credentianls -o --provider aws --key=<my-key-here> --secret <my-secret-here>
```

**Deploy**

```bash
serverless deploy -v
```

**Test function with servelesss invoke**

```bash
serverless invoke local --function hello --path mocks/test.json --region us-east-1
```

**Remove All**

```bash
serverless remove
```

**Start OFF line**

```bash
serverless offline
```

**Run test offline with aws CLI**

```bash
aws lambda invoke /dev/null --endpoint-url http://localhost:3002 --function-name hello
```

**References**

- https://www.serverless.com/framework/docs/getting-started
- http://slss.io/aws-creds-setup
- https://www.serverless.com/plugins/serverless-offline
- https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-linux.html
