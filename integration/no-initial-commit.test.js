import { withGitIntegration } from './utils/gitIntegration'
import { prettierListDifferent } from './fixtures/configs'
import { prettyJS } from './fixtures/files'

jest.unmock('execa')
jest.setTimeout(20000)
jest.retryTimes(2)

describe('integration', () => {
  test(
    'skips backup when run on an empty git repo without an initial commit',
    withGitIntegration(async ({ appendFile, execGit, gitCommit, readFile, cwd }) => {
      await appendFile('.lintstagedrc.json', JSON.stringify(prettierListDifferent))

      await appendFile('test.js', prettyJS, cwd)
      await execGit(['add', 'test.js'], { cwd })

      await expect(execGit(['log', '-1'], { cwd })).rejects.toThrowErrorMatchingInlineSnapshot(
        `"fatal: your current branch 'master' does not have any commits yet"`
      )

      expect(await gitCommit({ lintStaged: ['--debug'] })).toMatch(
        'Skipping backup because there’s no initial commit yet'
      )

      // Nothing is wrong, so the initial commit is created
      expect(await execGit(['rev-list', '--count', 'HEAD'], { cwd })).toEqual('1')
      expect(await execGit(['log', '-1', '--pretty=%B'], { cwd })).toMatch('test')
      expect(await readFile('test.js', cwd)).toEqual(prettyJS)
    }, false)
  )
})
