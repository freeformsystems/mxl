Table of Contents
=================

* [Tmux Launcher](#tmux-launcher)
  * [Install](#install)
  * [Usage](#usage)
  * [Configuration](#configuration)
  * [Examples](#examples)
    * [List files](#list-files)
    * [Launch](#launch)
    * [Launch All](#launch-all)
    * [Launch Profile](#launch-profile)
    * [Launch Project](#launch-project)
    * [Launch All Project](#launch-all-project)
    * [Launch Target](#launch-target)
  * [Developer](#developer)
    * [Docs](#docs)
    * [Manual](#manual)
    * [Readme](#readme)
  * [License](#license)

Tmux Launcher
=============

Tmux launcher.

Launches tmux profiles by invoking `source-file` ensuring your tmux 
configurations are completely portable, see [tmux.conf](https://github.com/freeformsystems/mxl/blob/master/tmux.conf).

Requires [node](http://nodejs.org) and [npm](http://www.npmjs.org).

## Install

```
npm i -g mxl
```

## Usage

```
mxl -h
mxl help
mxl help <cmd>
```

## Configuration

Start `tmux` and define commands in a `tmux.conf` file within a project,  add 
additional profiles by using the `.tmux.conf` suffix.

```conf
# vim: set ft=conf:
new-window -n mxl
send-keys -t: 'vim .' C-m
split-window -h -t:
send-keys -t: 'git status' C-m
select-pane -L
```

## Examples

### List files

Use the `ls` command to see matching configuration files:

```
mxl ls
mxl ls -a
mxl ls :test
```

### Launch

Launch `tmux.conf` in the current working directory:

```
mxl
```

### Launch All

Launch all profiles (`tmux.conf` and `*.tmux.conf`) in the current working 
directory:

```
mxl -a
```

### Launch Profile

Prefix an argument with `:` to treat the argument as a profile pattern matching 
regular expression, matches are performed on the file name.

Perform file name regular expression matching using a `:profile` reference:

```
mxl :test
```

### Launch Project

Launch `tmux.conf` in a target project directory:

```
mxl /usr/local/project
```

### Launch All Project

Launch all files in a target project directory:

```
mxl /usr/local/project -a
```

### Launch Target

Launch `tmux.conf` in current working directory with another target directory:

```
mxl -c /usr/local/project
```

This is particularly useful when you have a common configuration file that you 
wish to share across multiple projects.

## Developer

### Docs

To build all documentation:

```
npm run docs
```

### Manual

To build all man pages (requires [manpage][]):

```
npm run manual
```

### Readme

To build the readme file from the partial definitions (requires [mdp](https://github.com/freeformsystems/manpage)):

```
npm run readme
```

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](https://github.com/freeformsystems/mxl/blob/master/LICENSE) if you feel inclined.

Generated by [mdp(1)](https://github.com/freeformsystems/mdp).

[node]: http://nodejs.org
[npm]: http://www.npmjs.org
[mdp]: https://github.com/freeformsystems/manpage
[nvm]: https://github.com/creationix/nvm
