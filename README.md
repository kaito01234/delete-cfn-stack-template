# delete-cfn-stack-template

指定した CloudFormation Stack を削除します。

`template.yaml` を書き換えカスタマイズすることができます。

- `DeleteTestEnvFunction.Properties.Environment.Variables.regExp`
  - 正規表現で削除する Stack 名を指定できます
  - example:
    - `test-env-[0-9]+.-stack`
  - match:
    - `test-env-1-stack`
    - `test-env-005-stack`
    - `test-env-99999-stack`
  - not match:
    - `test-env--stack`
    - `test-env-abc-stack`
- `DeleteTestEnvFunction.Properties.Events.Schedule`
  - 実行する時間を指定できます。Cron 式で記載することができます。

SAM CLIを使用するには、次のツールが必要です。

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 14](https://nodejs.org/en/)
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## SAM CLI を使用して、ローカルでビルドおよびテストを行います

`sam build` コマンドを使用してアプリケーションをビルドします

```bash
sam build
```

ローカルで関数を、`sam local invoke`コマンドで実行することができます

```bash
sam local invoke
```

## アプリケーションのデプロイ

アプリケーションをビルドしてデプロイするには、以下を実行します。

```bash
sam build
sam deploy --guided
```
