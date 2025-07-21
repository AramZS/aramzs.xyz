---
author: Scott Spence
cover_image: >-
  https://ogimggen.vercel.app/og?title=Speeding%20Up%20My%20ZSH%20Shell%20⚡&author=Scott%20Spence&website=scottspence.com
date: '2025-07-21T17:03:31.382Z'
dateFolder: 2025/07/21
description: |-
  Super quick one I want to document here! I got myself on a side quest,
  again! No biggie, my ZSH shell was taking ages to load. When I say
  ag...
isBasedOn: 'https://scottspence.com/posts/speeding-up-my-zsh-shell'
link: 'https://scottspence.com/posts/speeding-up-my-zsh-shell'
slug: 2025-07-21-httpsscottspencecompostsspeeding-up-my-zsh-shell
tags:
  - code
  - tech
title: Speeding Up My ZSH Shell ⚡
---
<p>Super quick one I want to document here! I got myself on a side quest, again! No biggie, my ZSH shell was taking ages to load. When I say ages, more like 5+ seconds every time I opened a new terminal, that sort of thing can add up. This is just something I’ve lived with over the years, nothing has prompted this other than me wondering why it’s slow, then searching for how to profile it.</p>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#how-to-profile-your-zsh">How to profile your ZSH</a></h2>
<p>So, what’s actually slowing things down? Zsh comes with this super handy profiling tool called <code>zprof</code>. Here’s how to use it:</p>
<pre><code># Add this to the TOP of your .zshrc
zmodload zsh/zprof

# Add this to the BOTTOM of your .zshrc
zprof</code></pre>
<p>This give a load of output, but it’s a good starting point.</p>
<p>I had no idea this existed so massive shout out to <a href="https://blog.askesis.pl/post/2017/04/how-to-debug-zsh-startup-time.html">Jacek’s Blog</a> for this tip!</p>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#ok-so-what-was-making-my-shell-slow">Ok, so what was making my shell slow?</a></h2>
<p>When I ran the profiler, here’s what I found:</p>
<pre><code>1) _omz_source        55.73%   # Oh-My-Zsh loading everything
2) compinit           30.76%   # Completion system being slow
3) syntax-highlight   14.63%   # Making things pretty, but slow</code></pre>
<p>So, Oh-My-Zsh was taking up over half the startup time!</p>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#oh-my-zsh-5573--20">Oh-My-Zsh (55.73% → ~20%)</a></h2>
<p>According to <a href="https://blog.jonlu.ca/posts/speeding-up-zsh">JonLuca’s research</a>, this can cut the load time in half! The auto-updates are nice, but I’d rather do them manually when I want to.</p>
<pre><code># Top of .zshrc
DISABLE_AUTO_UPDATE="true"
DISABLE_MAGIC_FUNCTIONS="true"
DISABLE_COMPFIX="true"</code></pre>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#fixing-the-completion-system-3076--10">Fixing the completion system (30.76% → ~10%)</a></h2>
<p>The completion system (<code>compinit</code>) is zsh’s built-in command completion - it’s what shows possible completions when you hit tab. This is a neat trick I found. Instead of rebuilding the completion cache every time, we only do it once a day:</p>
<pre><code># Smarter completion initialization
autoload -Uz compinit
if [ "$(date +'%j')" != "$(stat -f '%Sm' -t '%j' ~/.zcompdump 2&gt;/dev/null)" ]; then
    compinit
else
    compinit -C
fi</code></pre>
<p>This comes from <a href="https://gist.github.com/ctechols/ca1035271ad134841284">a popular GitHub gist</a> - cheers for sharing this one!</p>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#making-spaceship-prompt-faster-2247--5">Making Spaceship Prompt Faster (22.47% → ~5%)</a></h2>
<p>I love Spaceship prompt (been using it for years!), but it was being a bit of a resource hog. Here’s how to speed it up:</p>
<pre><code>SPACESHIP_PROMPT_ASYNC=true
SPACESHIP_PROMPT_ADD_NEWLINE=true
SPACESHIP_CHAR_SYMBOL="⚡"

# Only load what you actually use
SPACESHIP_PROMPT_ORDER=(
    time
    user
    dir
    git
    line_sep
    char
)</code></pre>
<p>The Spaceship team actually <a href="https://github.com/spaceship-prompt/spaceship-prompt/issues/161">recommended this approach</a> - only load what you need!</p>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#plugin-management">Plugin management</a></h2>
<p>I have very few plugins, here’s how I organize my plugins now:</p>
<pre><code>plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting  # Always last!
)</code></pre>
<p>The order is super important here! According to the <a href="https://github.com/zsh-users/zsh-syntax-highlighting#why-must-zsh-syntax-highlightingzsh-be-sourced-at-the-end-of-the-zshrc-file">zsh-syntax-highlighting docs</a>, it needs to be last to work properly.</p>
<p>For autosuggestions, I added these performance tweaks:</p>
<pre><code>ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE="20"
ZSH_AUTOSUGGEST_USE_ASYNC=1</code></pre>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#the-results-fast-">The results? FAST! ⚡</a></h2>
<p>Check this out:</p>
<table><tr><th>Component</th><th>Before</th><th>After</th></tr><tbody><tr><td>Oh-My-Zsh</td><td>55.73%</td><td>~20%</td></tr><tr><td>Completions</td><td>30.76%</td><td>~10%</td></tr><tr><td>Syntax Highlight</td><td>14.63%</td><td>~8%</td></tr><tr><td>Total Time</td><td>~5s</td><td>~0.5s</td></tr></tbody></table>
<p>That’s like a 10x improvement! My terminal now opens in the blink of an eye!</p>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#want-to-try-this-yourself">Want to try this yourself?</a></h2>
<ol><li><p>Add the profiling code (I showed you earlier) to see what’s slow</p></li> <li><p>Try the fixes one at a time - that way you know what’s actually helping</p></li> <li><p>Keep what works for you - everyone’s setup is different!</p></li></ol>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#before-and-after">Before and after</a></h2>
<p>For comparison here’s a before and after configs:</p>
<pre><code># Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="spaceship"

# spaceship config
SPACESHIP_PROMPT_ASYNC=false
SPACESHIP_PROMPT_ADD_NEWLINE="true"
SPACESHIP_CHAR_SYMBOL="⚡"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
        git
        zsh-syntax-highlighting
        zsh-autosuggestions
)

source $ZSH/oh-my-zsh.sh

# User configuration

# auto suggest
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#663399,standout"

#-------- Global Alias {{{
globalias() {
  if [[ $LBUFFER =~ '[a-zA-Z0-9]+$' ]]; then
    zle _expand_alias
    zle expand-word
  fi
  zle self-insert
}
zle -N globalias
bindkey " " globalias                 # space key to expand globalalias
# bindkey "^ " magic-space            # control-space to bypass completion
bindkey "^[[Z" magic-space            # shift-tab to bypass completion
bindkey -M isearch " " magic-space    # normal space during searches
. ~/.zsh_aliases
#}}}

# Start SSH agent if not running
if [ -z "$SSH_AUTH_SOCK" ]; then
   eval "$(ssh-agent -s)" &gt; /dev/null
   ssh-add ~/.ssh/id_github_sign_and_auth 2&gt;/dev/null
fi

# volta
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
# volta end

# bun completions
#[ -s "/home/scott/.bun/_bun" ] &amp;&amp; source "/home/scott/.bun/_bun"

# Turso
export PATH="$PATH:/home/scott/.turso"</code></pre>
<p>With all the optimisations in place, here’s the after config:</p>
<pre><code># Performance optimizations
DISABLE_AUTO_UPDATE="true"
DISABLE_MAGIC_FUNCTIONS="true"
DISABLE_COMPFIX="true"

# Cache completions aggressively
autoload -Uz compinit
if [ "$(date +'%j')" != "$(stat -f '%Sm' -t '%j' ~/.zcompdump 2&gt;/dev/null)" ]; then
    compinit
else
    compinit -C
fi

# Oh My Zsh path
export ZSH="$HOME/.oh-my-zsh"

# Theme config - fixed syntax
ZSH_THEME="spaceship"

# Spaceship settings (fixed syntax)
SPACESHIP_PROMPT_ASYNC=true
SPACESHIP_PROMPT_ADD_NEWLINE=true
SPACESHIP_CHAR_SYMBOL="⚡"

# Minimal spaceship sections for performance
SPACESHIP_PROMPT_ORDER=(
  time
  user
  dir
  git
  line_sep
  char
)

# Carefully ordered plugins (syntax highlighting must be last)
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

# Source Oh My Zsh
source $ZSH/oh-my-zsh.sh

# Autosuggest settings
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#663399,standout"
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE="20"
ZSH_AUTOSUGGEST_USE_ASYNC=1

# Alias expansion function
globalias() {
   if [[ $LBUFFER =~ '[a-zA-Z0-9]+$' ]]; then
       zle _expand_alias
       zle expand-word
   fi
   zle self-insert
}
zle -N globalias
bindkey " " globalias
bindkey "^[[Z" magic-space
bindkey -M isearch " " magic-space

# Lazy load SSH agent
function _load_ssh_agent() {
    if [ -z "$SSH_AUTH_SOCK" ]; then
        eval "$(ssh-agent -s)" &gt; /dev/null
        ssh-add ~/.ssh/id_github_sign_and_auth 2&gt;/dev/null
    fi
}
autoload -U add-zsh-hook
add-zsh-hook precmd _load_ssh_agent

# Path configurations
export VOLTA_HOME="$HOME/.volta"
PATH="$VOLTA_HOME/bin:$PATH:/home/scott/.turso"
export PATH

# Source aliases last
[ -f ~/.zsh_aliases ] &amp;&amp; source ~/.zsh_aliases</code></pre>
<h2><a href="https://scottspence.com/posts/speeding-up-my-zsh-shell#other-things">Other things</a></h2>
<p>As per usual when I do this sort of thing I alway search around for alternitives, I tried <a href="https://starship.rs">Starship</a> and to be honest, I’m pretty happy with zsh, what it was for me (when trying it) is I don’t use <code>cd</code> I’m so used to just entering the directory name I was pretty put off straight away. 😅</p>
<p>There were other things out there, like:</p>
<ul><li>Pure prompt (super fast alternative to Spaceship)</li> <li><a href="https://github.com/zdharma-continuum/fast-syntax-highlighting">fast-syntax-highlighting</a> (potentially faster than regular syntax highlighting, though the default is pretty quick already!)</li> <li>Zinit (a faster alternative to Oh-My-Zsh if you want to try something different)</li></ul>
<p>But, honestly? If you’re happy with your current setup (and I am) and it’s fast enough, stick with it! This was me going on a little side quest because I was curious. My curiosity was rewarded with a much faster shell!</p>
<p>That’s it! Hope this helps if you were having similar issues!</p>
<p>There's a <a href="https://scottspence.com/reactions-leaderboard">reactions leaderboard</a> you can check out too.</p>
<p><a href="https://bsky.app/intent/compose?text=Check%20out%20this%20post%20from%20@scottspence.dev,%20Speeding%20Up%20My%20ZSH%20Shell%20%E2%9A%A1:%20https://scottspence.com/posts/speeding-up-my-zsh-shell">Useful? Share it on Bluesky. </a></p>
<p><a href="https://scottspence.com/stats/speeding-up-my-zsh-shell">✨ View the stats for this post ✨</a></p>
<p>Related posts...</p>
<p><a data-sveltekit-reload="" href="https://scottspence.com/posts/my-updated-zsh-config-2025"><aside><h3>My Updated ZSH Config 2025</h3></aside></a><a data-sveltekit-reload="" href="https://scottspence.com/posts/my-zsh-config"><aside><h3>My Zsh Config</h3></aside></a><a data-sveltekit-reload="" href="https://scottspence.com/posts/zsh-and-oh-my-zsh"><aside><h3>Notes on Zsh and Oh My Zsh</h3></aside></a><a data-sveltekit-reload="" href="https://scottspence.com/posts/fish-shell-introduction"><aside><h3>Fish Shell Introduction</h3></aside></a></p>
<aside><p>Looks like you have reached the bottom of this page!</p> <p>Bummer!</p> <p>Cool! You can leave that in the Rear-view now!</p> </aside>
