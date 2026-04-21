---
author: GitHub Docs
cover_image: 'https://docs.github.com/assets/cb-345/images/social-cards/copilot.png'
date: '2026-04-20T17:13:52.846Z'
dateFolder: 2026/04/20
description: >-
  Create repository custom instructions files that give Copilot additional
  context on how to understand your project and how to build, test and validate
  its changes.
isBasedOn: >-
  https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions
link: >-
  https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions
slug: >-
  2026-04-20-httpsdocsgithubcomencopilothow-tosconfigure-custom-instructionsadd-repository-instructions
tags:
  - ai
  - code
  - tech
title: Adding repository custom instructions for GitHub Copilot - GitHub Docs
---
<ul><li><a data-testid="breadcrumb-link" href="https://docs.github.com/en/copilot">GitHub Copilot</a></li><li><a data-testid="breadcrumb-link" href="https://docs.github.com/en/copilot/how-tos">How-tos</a></li><li><a data-testid="breadcrumb-link" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions">Configure custom instructions</a></li><li><a data-testid="breadcrumb-link" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions">Add repository instructions</a></li></ul>
<h1>Adding repository custom instructions for GitHub Copilot</h1>
<p>Create repository custom instructions files that give Copilot additional context on how to understand your project and how to build, test and validate its changes.</p>
<h2>Tool navigation</h2>
<ul><li><a data-tool="vscode" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/?tool=vscode">Visual Studio Code</a></li><li><a data-tool="jetbrains" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/?tool=jetbrains">JetBrains IDEs</a></li><li><a data-tool="visualstudio" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/?tool=visualstudio">Visual Studio</a></li><li><a data-tool="webui" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/?tool=webui">Web browser</a></li><li><a data-tool="eclipse" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/?tool=eclipse">Eclipse</a></li><li><a data-tool="xcode" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/?tool=xcode">Xcode</a></li></ul>
<p>Copy as Markdown</p>
<h2>In this article</h2>
<ul data-dividers="false" data-variant="inset"><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#introduction">Introduction</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#prerequisites-for-repository-custom-instructions">Prerequisites for repository custom instructions</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-custom-instructions">Creating custom instructions</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-repository-wide-custom-instructions">Creating repository-wide custom instructions</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-path-specific-custom-instructions">Creating path-specific custom instructions</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#custom-instructions-in-use">Custom instructions in use</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#enabling-or-disabling-custom-instructions-for-copilot-code-review">Enabling or disabling custom instructions for Copilot code review</a></li><li data-has-description="false"><a data-size="medium" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#further-reading">Further reading</a></li></ul>
<p>This version of this article is for using repository custom instructions on the GitHub website. Click the tabs above for information on using custom instructions in other environments.</p>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#introduction">Introduction</a></h2>
<p>Repository custom instructions let you provide Copilot with repository-specific guidance and preferences. For more information, see <a href="https://docs.github.com/en/copilot/concepts/prompting/response-customization">About customizing GitHub Copilot responses</a>.</p>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#prerequisites-for-repository-custom-instructions">Prerequisites for repository custom instructions</a></h2>
<ul> <li> <p>You must have a custom instructions file (see the instructions below).</p> </li> <li> <p>For Copilot code review, your personal choice of whether to use custom instructions must be set to enabled. This is enabled by default. See <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#enabling-or-disabling-custom-instructions-for-copilot-code-review">Enabling or disabling repository custom instructions</a> later in this article.</p> </li> </ul>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-custom-instructions">Creating custom instructions</a></h2>
<p>Copilot on GitHub supports three types of repository custom instructions. For details of which GitHub Copilot features support these types of instructions, see <a href="https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=webui#support-for-repository-custom-instructions">About customizing GitHub Copilot responses</a>.</p>
<ul> <li> <p><strong>Repository-wide custom instructions</strong> apply to all requests made in the context of a repository.</p> <p>These are specified in a <code>copilot-instructions.md</code> file in the <code>.github</code> directory of the repository. See <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-repository-wide-custom-instructions-2">Creating repository-wide custom instructions</a>.</p> </li> <li> <p><strong>Path-specific custom instructions</strong> apply to requests made in the context of files that match a specified path.</p> <p>These are specified in one or more <code>NAME.instructions.md</code> files within or below the <code>.github/instructions</code> directory in the repository. See <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-path-specific-custom-instructions-2">Creating path-specific custom instructions</a>.</p> <p>If the path you specify matches a file that Copilot is working on, and a repository-wide custom instructions file also exists, then the instructions from both files are used.</p> </li> <li> <p><strong>Agent instructions</strong> are used by AI agents.</p> <p>You can create one or more <code>AGENTS.md</code> files, stored anywhere within the repository. When Copilot is working, the nearest <code>AGENTS.md</code> file in the directory tree will take precedence. For more information, see the <a href="https://github.com/agentsmd/agents.md">agentsmd/agents.md repository</a>.</p> <p>Alternatively, you can use a single <code>CLAUDE.md</code> or <code>GEMINI.md</code> file stored in the root of the repository.</p> </li> </ul>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-repository-wide-custom-instructions">Creating repository-wide custom instructions</a></h2>
<p>You can create your own custom instructions file from scratch. See <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#writing-your-own-copilot-instructionsmd-file">Writing your own copilot-instructions.md file</a>. Alternatively, you can ask Copilot cloud agent to generate one for you.</p>
<h3><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#asking-copilot-cloud-agent-to-generate-a-copilot-instructionsmd-file">Asking Copilot cloud agent to generate a <code>copilot-instructions.md</code> file</a></h3>
<ol> <li> <p>Navigate to the agents tab at <a href="https://github.com/copilot/agents?ref_product=copilot&amp;ref_type=engagement&amp;ref_style=text">github.com/copilot/agents</a>.</p> <p>You can also reach this page by clicking the  button next to the search bar on any page on GitHub, then selecting <strong>Agents</strong> from the sidebar.</p> </li> <li> <p>Using the dropdown menu in the prompt field, select the repository you want Copilot to generate custom instructions for.</p> </li> <li> <p>Copy the following prompt and paste it into the prompt field, customizing it if needed:</p> Markdown<pre data-clipboard="1280556777">Your task is to "onboard" this repository to Copilot cloud agent by adding a .github/copilot-instructions.md file in the repository that contains information describing how a cloud agent seeing it for the first time can work most efficiently.

You will do this task only one time per repository and doing a good job can SIGNIFICANTLY improve the quality of the agent's work, so take your time, think carefully, and search thoroughly before writing the instructions.

&lt;Goals&gt;
- Reduce the likelihood of a cloud agent pull request getting rejected by the user due to
generating code that fails the continuous integration build, fails a validation pipeline, or
having misbehavior.
- Minimize bash command and build failures.
- Allow the agent to complete its task more quickly by minimizing the need for exploration using grep, find, str_replace_editor, and code search tools.
&lt;/Goals&gt;

&lt;Limitations&gt;
- Instructions must be no longer than 2 pages.
- Instructions must not be task specific.
&lt;/Limitations&gt;

&lt;WhatToAdd&gt;

Add the following high level details about the codebase to reduce the amount of searching the agent has to do to understand the codebase each time:
&lt;HighLevelDetails&gt;

- A summary of what the repository does.
- High level repository information, such as the size of the repo, the type of the project, the languages, frameworks, or target runtimes in use.
&lt;/HighLevelDetails&gt;

Add information about how to build and validate changes so the agent does not need to search and find it each time.
&lt;BuildInstructions&gt;

- For each of bootstrap, build, test, run, lint, and any other scripted step, document the sequence of steps to take to run it successfully as well as the versions of any runtime or build tools used.
- Each command should be validated by running it to ensure that it works correctly as well as any preconditions and postconditions.
- Try cleaning the repo and environment and running commands in different orders and document errors and misbehavior observed as well as any steps used to mitigate the problem.
- Run the tests and document the order of steps required to run the tests.
- Make a change to the codebase. Document any unexpected build issues as well as the workarounds.
- Document environment setup steps that seem optional but that you have validated are actually required.
- Document the time required for commands that failed due to timing out.
- When you find a sequence of commands that work for a particular purpose, document them in detail.
- Use language to indicate when something should always be done. For example: "always run npm install before building".
- Record any validation steps from documentation.
&lt;/BuildInstructions&gt;

List key facts about the layout and architecture of the codebase to help the agent find where to make changes with minimal searching.
&lt;ProjectLayout&gt;

- A description of the major architectural elements of the project, including the relative paths to the main project files, the location
of configuration files for linting, compilation, testing, and preferences.
- A description of the checks run prior to check in, including any GitHub workflows, continuous integration builds, or other validation pipelines.
- Document the steps so that the agent can replicate these itself.
- Any explicit validation steps that the agent can consider to have further confidence in its changes.
- Dependencies that aren't obvious from the layout or file structure.
- Finally, fill in any remaining space with detailed lists of the following, in order of priority: the list of files in the repo root, the
contents of the README, the contents of any key source files, the list of files in the next level down of directories, giving priority to the more structurally important and snippets of code from key source files, such as the one containing the main method.
&lt;/ProjectLayout&gt;
&lt;/WhatToAdd&gt;

&lt;StepsToFollow&gt;
- Perform a comprehensive inventory of the codebase. Search for and view:
- README.md, CONTRIBUTING.md, and all other documentation files.
- Search the codebase for build steps and indications of workarounds like 'HACK', 'TODO', etc.
- All scripts, particularly those pertaining to build and repo or environment setup.
- All build and actions pipelines.
- All project files.
- All configuration and linting files.
- For each file:
- think: are the contents or the existence of the file information that the cloud agent will need to implement, build, test, validate, or demo a code change?
- If yes:
   - Document the command or information in detail.
   - Explicitly indicate which commands work and which do not and the order in which commands should be run.
   - Document any errors encountered as well as the steps taken to workaround them.
- Document any other steps or information that the agent can use to reduce time spent exploring or trying and failing to run bash commands.
- Finally, explicitly instruct the agent to trust the instructions and only perform a search if the information in the instructions is incomplete or found to be in error.
&lt;/StepsToFollow&gt;
   - Document any errors encountered as well as the steps taken to work-around them.

</pre><pre><code>Your task is to "onboard" this repository to Copilot cloud agent by adding a .github/copilot-instructions.md file in the repository that contains information describing how a cloud agent seeing it for the first time can work most efficiently.

You will do this task only one time per repository and doing a good job can SIGNIFICANTLY improve the quality of the agent's work, so take your time, think carefully, and search thoroughly before writing the instructions.

&lt;Goals&gt;
- Reduce the likelihood of a cloud agent pull request getting rejected by the user due to
generating code that fails the continuous integration build, fails a validation pipeline, or
having misbehavior.
- Minimize bash command and build failures.
- Allow the agent to complete its task more quickly by minimizing the need for exploration using grep, find, str_replace_editor, and code search tools.
&lt;/Goals&gt;

&lt;Limitations&gt;
- Instructions must be no longer than 2 pages.
- Instructions must not be task specific.
&lt;/Limitations&gt;

&lt;WhatToAdd&gt;

Add the following high level details about the codebase to reduce the amount of searching the agent has to do to understand the codebase each time:
&lt;HighLevelDetails&gt;

- A summary of what the repository does.
- High level repository information, such as the size of the repo, the type of the project, the languages, frameworks, or target runtimes in use.
&lt;/HighLevelDetails&gt;

Add information about how to build and validate changes so the agent does not need to search and find it each time.
&lt;BuildInstructions&gt;

- For each of bootstrap, build, test, run, lint, and any other scripted step, document the sequence of steps to take to run it successfully as well as the versions of any runtime or build tools used.
- Each command should be validated by running it to ensure that it works correctly as well as any preconditions and postconditions.
- Try cleaning the repo and environment and running commands in different orders and document errors and misbehavior observed as well as any steps used to mitigate the problem.
- Run the tests and document the order of steps required to run the tests.
- Make a change to the codebase. Document any unexpected build issues as well as the workarounds.
- Document environment setup steps that seem optional but that you have validated are actually required.
- Document the time required for commands that failed due to timing out.
- When you find a sequence of commands that work for a particular purpose, document them in detail.
- Use language to indicate when something should always be done. For example: "always run npm install before building".
- Record any validation steps from documentation.
&lt;/BuildInstructions&gt;

List key facts about the layout and architecture of the codebase to help the agent find where to make changes with minimal searching.
&lt;ProjectLayout&gt;

- A description of the major architectural elements of the project, including the relative paths to the main project files, the location
of configuration files for linting, compilation, testing, and preferences.
- A description of the checks run prior to check in, including any GitHub workflows, continuous integration builds, or other validation pipelines.
- Document the steps so that the agent can replicate these itself.
- Any explicit validation steps that the agent can consider to have further confidence in its changes.
- Dependencies that aren't obvious from the layout or file structure.
- Finally, fill in any remaining space with detailed lists of the following, in order of priority: the list of files in the repo root, the
contents of the README, the contents of any key source files, the list of files in the next level down of directories, giving priority to the more structurally important and snippets of code from key source files, such as the one containing the main method.
&lt;/ProjectLayout&gt;
&lt;/WhatToAdd&gt;

&lt;StepsToFollow&gt;
- Perform a comprehensive inventory of the codebase. Search for and view:
- README.md, CONTRIBUTING.md, and all other documentation files.
- Search the codebase for build steps and indications of workarounds like 'HACK', 'TODO', etc.
- All scripts, particularly those pertaining to build and repo or environment setup.
- All build and actions pipelines.
- All project files.
- All configuration and linting files.
- For each file:
- think: are the contents or the existence of the file information that the cloud agent will need to implement, build, test, validate, or demo a code change?
- If yes:
   - Document the command or information in detail.
   - Explicitly indicate which commands work and which do not and the order in which commands should be run.
   - Document any errors encountered as well as the steps taken to workaround them.
- Document any other steps or information that the agent can use to reduce time spent exploring or trying and failing to run bash commands.
- Finally, explicitly instruct the agent to trust the instructions and only perform a search if the information in the instructions is incomplete or found to be in error.
&lt;/StepsToFollow&gt;
   - Document any errors encountered as well as the steps taken to work-around them.

</code></pre> </li> <li> <p>Click  or press Enter.</p> </li> </ol>
<p>Copilot will start a new session, which will appear in the list below the prompt box. Copilot will create a draft pull request, write your custom instructions, push them to the branch, then add you as a reviewer when it has finished, triggering a notification.</p>
<h3><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#writing-your-own-copilot-instructionsmd-file">Writing your own <code>copilot-instructions.md</code> file</a></h3>
<ol> <li> <p>In the root of your repository, create a file named <code>.github/copilot-instructions.md</code>.</p> <p>Create the <code>.github</code> directory if it does not already exist.</p> </li> <li> <p>Add natural language instructions to the file, in Markdown format.</p> <p>Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.</p> </li> </ol>
<p>Tip</p>
<p>The first time you create a pull request in a given repository with Copilot cloud agent, Copilot will leave a comment with a link to automatically generate custom instructions for the repository.</p>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#creating-path-specific-custom-instructions">Creating path-specific custom instructions</a></h2>
<p>Note</p>
<p>Currently, on GitHub.com, path-specific custom instructions are only supported for Copilot cloud agent and Copilot code review.</p>
<ol> <li> <p>Create the <code>.github/instructions</code> directory if it does not already exist.</p> </li> <li> <p>Optionally, create subdirectories of <code>.github/instructions</code> to organize your instruction files.</p> </li> <li> <p>Create one or more <code>NAME.instructions.md</code> files, where <code>NAME</code> indicates the purpose of the instructions. The file name must end with <code>.instructions.md</code>.</p> </li> <li> <p>At the start of the file, create a frontmatter block containing the <code>applyTo</code> keyword. Use glob syntax to specify what files or directories the instructions apply to.</p> <p>For example:</p> <pre><code>---
applyTo: "app/models/**/*.rb"
---
</code></pre> <p>You can specify multiple patterns by separating them with commas. For example, to apply the instructions to all TypeScript files in the repository, you could use the following frontmatter block:</p> <pre><code>---
applyTo: "**/*.ts,**/*.tsx"
---
</code></pre> <p>Glob examples:</p> <ul> <li><code>*</code> - will all match all files in the current directory.</li> <li><code>**</code> or <code>**/*</code> - will all match all files in all directories.</li> <li><code>*.py</code> - will match all <code>.py</code> files in the current directory.</li> <li><code>**/*.py</code> - will recursively match all <code>.py</code> files in all directories.</li> <li><code>src/*.py</code> - will match all <code>.py</code> files in the <code>src</code> directory. For example, <code>src/foo.py</code> and <code>src/bar.py</code> but <em>not</em> <code>src/foo/bar.py</code>.</li> <li><code>src/**/*.py</code> - will recursively match all <code>.py</code> files in the <code>src</code> directory. For example, <code>src/foo.py</code>, <code>src/foo/bar.py</code>, and <code>src/foo/bar/baz.py</code>.</li> <li><code>**/subdir/**/*.py</code> - will recursively match all <code>.py</code> files in any <code>subdir</code> directory at any depth. For example, <code>subdir/foo.py</code>, <code>subdir/nested/bar.py</code>, <code>parent/subdir/baz.py</code>, and <code>deep/parent/subdir/nested/qux.py</code>, but <em>not</em> <code>foo.py</code> at a path that does not contain a <code>subdir</code> directory.</li> </ul> </li> <li> <p>Optionally, to prevent the file from being used by either Copilot cloud agent or Copilot code review, add the <code>excludeAgent</code> keyword to the frontmatter block. Use either <code>"code-review"</code> or <code>"cloud-agent"</code>.</p> <p>For example, the following file will only be read by Copilot cloud agent.</p> <pre><code>---
applyTo: "**"
excludeAgent: "code-review"
---
</code></pre> <p>If the <code>excludeAgent</code> keyword is not included in the front matterblock, both Copilot code review and Copilot cloud agent will use your instructions.</p> </li> <li> <p>Add your custom instructions in natural language, using Markdown format. Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.</p> </li> </ol>
<p>Did you successfully add a custom instructions file to your repository?</p>
<p><a href="https://docs.github.io/success-test/yes.html">Yes</a> <a href="https://docs.github.io/success-test/no.html">No</a></p>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#custom-instructions-in-use">Custom instructions in use</a></h2>
<p>The instructions in the file(s) are available for use by Copilot as soon as you save the file(s). Instructions are automatically added to requests that you submit to Copilot.</p>
<p>In Copilot Chat (<a href="https://github.com/copilot">github.com/copilot</a>), you can start a conversation that uses repository custom instructions by adding, as an attachment, the repository that contains the instructions file.</p>
<p>Whenever repository custom instructions are used by Copilot Chat, the instructions file is added as a reference for the response that's generated. To find out whether repository custom instructions were used, expand the list of references at the top of a chat response in the Chat panel and check whether the <code>.github/copilot-instructions.md</code> file is listed.</p>
<figure><picture><source srcset="https://docs.github.com/assets/cb-42321/mw-1440/images/help/copilot/custom-instructions-ref-in-github.webp 2x" type="image/webp"/><figure><img alt="Screenshot of an expanded References list, showing the 'copilot-instructions.md' file highlighted with a dark orange outline." src="https://docs.github.com/assets/cb-42321/images/help/copilot/custom-instructions-ref-in-github.png"/></figure></picture></figure>
<p>You can click the reference to open the file.</p>
<p>Note</p>
<ul> <li>Multiple types of custom instructions can apply to a request sent to Copilot. Personal instructions take the highest priority. Repository instructions come next, and then organization instructions are prioritized last. However, all sets of relevant instructions are provided to Copilot.</li> <li>Whenever possible, try to avoid providing conflicting sets of instructions. If you are concerned about response quality, you can temporarily disable repository instructions. See <a href="https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot?tool=webui#enabling-or-disabling-repository-custom-instructions">Adding repository custom instructions for GitHub Copilot</a>.</li> </ul>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#enabling-or-disabling-custom-instructions-for-copilot-code-review">Enabling or disabling custom instructions for Copilot code review</a></h2>
<p>Custom instructions are enabled for Copilot code review by default but you can disable, or re-enable, them in the repository settings on GitHub.com. This applies to Copilot's use of custom instructions for all code reviews it performs in this repository.</p>
<ol> <li> <p>On GitHub, navigate to the main page of the repository.</p> </li> <li> <p>Under your repository name, click <strong> Settings</strong>. If you cannot see the "Settings" tab, select the  dropdown menu, then click <strong>Settings</strong>.</p> <figure><picture><source srcset="https://docs.github.com/assets/cb-28260/mw-1440/images/help/repository/repo-actions-settings.webp 2x" type="image/webp"/><figure><img alt='Screenshot of a repository header showing the tabs. The "Settings" tab is highlighted by a dark orange outline.' src="https://docs.github.com/assets/cb-28260/images/help/repository/repo-actions-settings.png"/></figure></picture></figure> </li> <li> <p>In the "Code &amp; automation" section of the sidebar, click <strong> Copilot</strong>, then <strong>Code review</strong>.</p> </li> <li> <p>Toggle the “Use custom instructions when reviewing pull requests” option on or off.</p> </li> </ol>
<p>Note</p>
<p>When reviewing a pull request, Copilot uses the custom instructions in the base branch of the pull request. For example, if your pull request seeks to merge <code>my-feature-branch</code> into <code>main</code>, Copilot will use the custom instructions in <code>main</code>.</p>
<h2><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions/#further-reading">Further reading</a></h2>
<ul> <li><a href="https://docs.github.com/en/copilot/reference/custom-instructions-support">Support for different types of custom instructions</a></li> <li><a href="https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions">Custom instructions</a>—a curated collection of examples</li> <li><a href="https://docs.github.com/en/copilot/tutorials/use-custom-instructions">Using custom instructions to unlock the power of Copilot code review</a></li> </ul>
