# mrm-tasks

Homebound's opinionated MRM tasks.

## Usage

The tasks need to be installed first:

```
npm install -g mrm
npm install -g @homebound/mrm-tasks-prettier \
  @homebound/mrm-tasks-gitignore \
  @homebound/mrm-tasks-typescript \
  @homebound/mrm-tasks-circleci \
  @homebound/mrm-tasks-semantic-release
```

And then after that you can apply each one to your project:

```
npm init -y
mrm @homebound/mrm-tasks-prettier
mrm @homebound/mrm-tasks-gitignore
mrm @homebound/mrm-tasks-typescript
mrm @homebound/mrm-tasks-semantic-release
mrm @homebound/mrm-tasks-circleci
```

## Todo

* Investigate mrm presets to combine tasks a into a single `mrm @homebound/typescript-lib`
* Support more than just typescript libraries, i.e. a GraphQL backend or CRA frontend?
* Storybook?
