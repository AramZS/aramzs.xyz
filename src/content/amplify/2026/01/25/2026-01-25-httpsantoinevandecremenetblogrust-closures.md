---
author: vandecreme.net
cover_image: null
date: '2026-01-25T07:42:59.796Z'
dateFolder: 2026/01/25
description: Antoine Vandecrème personal site. Mostly about programming.
isBasedOn: 'https://antoine.vandecreme.net/blog/rust-closures/'
link: 'https://antoine.vandecreme.net/blog/rust-closures/'
slug: 2026-01-25-httpsantoinevandecremenetblogrust-closures
tags:
  - code
title: Understanding rust closures
---
<p>While reading the <a href="https://smallcultfollowing.com/babysteps/blog/2025/10/22/explicit-capture-clauses/">Explicit capture clauses</a> blog post, I realized that my understanding of rust closures was very superficial. This article is an attempt at explaining what I learned while reading and experimenting on the subject. It starts from the very basics and then explore more complex topics. Note that each title is a link to a rust playground where you can experiment with the code in the section.</p>
<p>You probably already know that a closure in rust is a function written with the following syntax:</p>
<pre data-lang="rust"><code data-lang="rust">let double_closure = |x| x * 2;
assert_eq!(4, double_closure(2));
</code></pre>
<p>Written as a regular function it looks like:</p>
<pre data-lang="rust"><code data-lang="rust">fn double_function(x: u32) -&gt; u32 {
    x * 2
}
assert_eq!(4, double_function(2));
</code></pre>
<p>Very similar. There is actually a small difference between the two, the <code>double_function</code> parameter and return type are <code>u32</code>. On the other hand, because we did not specify any type in <code>double_closure</code>, the <a href="https://github.com/rust-lang/rfcs/blob/master/text/0212-restore-int-fallback.md">default integer type</a> has been picked, namely <code>i32</code>.</p>
<p>We can fix that like this:</p>
<pre data-lang="rust"><code data-lang="rust">let double_typed_closure = |x: u32| -&gt; u32 { x * 2 };
assert_eq!(4, double_typed_closure(2));
assert_eq!(4, double_typed_closure(2u32));
// assert_eq!(4, double_typed_closure(2u16)); // This would be an error.
</code></pre>
<p>And for a classic example usage of closures, we can use the <code>Option::map</code> method:</p>
<pre data-lang="rust"><code data-lang="rust">assert_eq!(Some(4), Some(2).map(|x| x * 2));
assert_eq!(Some(4), Some(2).map(double_closure)); // double_closure from above
assert_eq!(Some(4), Some(2).map(double_function)); // Passing double_function works too!
</code></pre>
<p>So, it seems closures are just a shorter syntax for functions with type inference.</p>
<p>The main difference between closures and functions is that closures can capture variables from their environment while functions can't:</p>
<pre data-lang="rust"><code data-lang="rust">let hello = "Hello ";
let greeter_closure = |x| String::new() + hello + x;
assert_eq!("Hello world", greeter_closure("world"));
assert_eq!(
    Some("Hello world".to_owned()),
    Some("world").map(greeter_closure)
);
</code></pre>
<p>Notice how the <code>hello</code> variable is used within the body of the <code>greeter_closure</code>. Let's try that with a function:</p>
<pre data-lang="rust"><code data-lang="rust">let hello = "Hello ";
fn greeter_function(x: &amp;str) -&gt; String {
    String::new() + hello + x
}
</code></pre>
<pre><code>error[E0434]: can't capture dynamic environment in a fn item
 --&gt; src/main.rs:7:25
  |
7 |         String::new() + hello + x
  |                         ^^^^^
  |
  = help: use the `|| { ... }` closure form instead
</code></pre>
<p>This does not work and the compiler helpfully suggest to use a closure instead.</p>
<h2><a href="https://play.rust-lang.org/?version=stable&amp;mode=debug&amp;edition=2024&amp;gist=0276070dfd19827a12a77cf31beae73e">Capture by shared reference</a></h2>
<p>In the <code>greeter_closure</code> example above, the <code>hello</code> variable was captured by shared reference because the variable is only read. As shown below, we can still use that variable after the closure declaration and usage:</p>
<pre data-lang="rust"><code data-lang="rust">let hello = "Hello ";
let greeter_closure = |x| String::new() + hello + x;
// We can still use the `hello` variable here
assert_eq!("Hello ", hello);
assert_eq!("Hello world", greeter_closure("world"));
// And here
assert_eq!("Hello ", hello);
</code></pre>
<p>It is also possible to capture by mutable reference so that the closure can alter the value of the captured variable. See this naive way to compute the sum of integers from 1 to 10:</p>
<pre data-lang="rust"><code data-lang="rust">let mut total = 0;
let add_mut_closure = |x| total += x;
// We can't access total here:
// assert_eq!(0, total);
// error[E0502]: cannot borrow `total` as immutable because it is also borrowed as mutable
(1..=10).for_each(add_mut_closure);
// But we can access total here, now that `add_mut_closure` is out of scope.
assert_eq!(55, total);
</code></pre>
<p>Finally, one can capture by value:</p>
<pre data-lang="rust"><code data-lang="rust">let last_word = "last word: ".to_owned();
let drop_closure = |sigh| {
    let res = String::new() + &amp;last_word + sigh;
    drop(last_word); // Forcing the capture by value
    res
};
// We can't access `last_word` here:
// assert_eq!("last word: ".to_owned(), last_word);
// error[E0382]: borrow of moved value: `last_word`
assert_eq!("last word: sigh!", drop_closure("sigh!"));
// We can't access `last_word` here either
// assert_eq!("last word: ".to_owned(), last_word);
// error[E0382]: borrow of moved value: `last_word`
// And we can't call drop_closure again
// assert_eq!("last word: sigh!", drop_closure("sigh!"));
// error[E0382]: use of moved value: `drop_closure`
</code></pre>
<p>In the previous example, notice the last error when trying to call <code>drop_closure</code> twice. Here is the full error:</p>
<pre><code>error[E0382]: use of moved value: `drop_closure`
  --&gt; src/main.rs:18:32
   |
12 | assert_eq!("last word: sigh!", drop_closure("sigh!"));
   |                                --------------------- `drop_closure` moved due to this call
...
18 | assert_eq!("last word: sigh!", drop_closure("sigh!"));
   |                                ^^^^^^^^^^^^ value used here after move
   |
note: closure cannot be invoked more than once because it moves the variable `last_word` out of its environment
  --&gt; src/main.rs:5:10
   |
 5 |     drop(last_word);
   |          ^^^^^^^^^
note: this value implements `FnOnce`, which causes it to be moved when called
  --&gt; src/main.rs:12:32
   |
12 | assert_eq!("last word: sigh!", drop_closure("sigh!"));
   |                                ^^^^^^^^^^^^
</code></pre>
<p>The interesting note is:</p>
<pre><code>note: this value implements `FnOnce`, which causes it to be moved when called
</code></pre>
<p>What is that <code>FnOnce</code> implementation the compiler is talking about?</p>
<p>It is a trait automatically implemented by the compiler which state that the closure can be called at least once.</p>
<p>That trait is a bit special because it cannot be implemented manually in stable rust.<br/>
 However, if we switch to unstable and enable some features, we can play with it and try to desugar how closures are actually implemented by the compiler.</p>
<p>Let's try to desugar the <code>drop_closure</code> above.</p>
<p>First, make sure to <a href="https://doc.rust-lang.org/book/appendix-07-nightly-rust.html#rustup-and-the-role-of-rust-nightly">switch to the nightly channel</a> and to enable the following features (for example by putting them at the top of your <code>main.rs</code>):</p>
<pre data-lang="rust"><code data-lang="rust">#![feature(fn_traits)]
#![feature(unboxed_closures)]
</code></pre>
<p>Next, we need to define a struct having the captured variables as fields:</p>
<pre data-lang="rust"><code data-lang="rust">struct DropStruct {
    last_word: String,
}
</code></pre>
<p>Simple enough, we are capturing only one variable so our struct has one field.</p>
<p>Now the <code>FnOnce</code> implementation:</p>
<pre data-lang="rust"><code data-lang="rust">impl FnOnce&lt;(&amp;str,)&gt; for DropStruct {
    type Output = String;
    extern "rust-call" fn call_once(self, (sigh,): (&amp;str,)) -&gt; Self::Output {
        let res = String::new() + &amp;self.last_word + sigh;
        drop(self.last_word);
        res
    }
}
</code></pre>
<p>That is some weird trait!</p>
<p>Let's go step by step.<br/>
<code>impl FnOnce&lt;(&amp;str,)&gt;</code> means that we are implementing a closure which takes one parameter which is a <code>&amp;str</code>.<br/>
 If the closure took two arguments of type <code>i32</code> and <code>i64</code> we would have <code>impl FnOnce&lt;(i32, i64)&gt;</code>. <code>(&amp;str,)</code> is the definition of a tuple of one element. See the reference on <a href="https://doc.rust-lang.org/reference/types/tuple.html">tuple types</a> for details.</p>
<p><code>for DropStruct</code> should not be too surprising.</p>
<p><code>type Output = String</code> specifies that our closure returns a <code>String</code>.</p>
<p><code>extern "rust-call"</code> is some magic which I won't explain mostly because I don't know exactly why it is required.</p>
<p>The rest of the implementation should be self explanatory. We just took the content of the closure and replaced <code>last_word</code> by <code>self.last_word</code>.</p>
<p>Let's try it:</p>
<pre data-lang="rust"><code data-lang="rust">let last_word = "last word: ".to_owned();
let drop_struct = DropStruct { last_word };
// We could call `call_once`:
// assert_eq!("last word: sigh!", drop_struct.call_once(("sigh!",)));
// But more simply, we can use the function call syntax:
assert_eq!("last word: sigh!", drop_struct("sigh!"));
// And we still can't call it twice
// assert_eq!("last word: sigh!", drop_struct("sigh!"));
// error[E0382]: use of moved value: `drop_struct`
</code></pre>
<p>What about our <code>add_mut_closure</code> from before? We were able to call it multiple times and even mutate the capture variables.</p>
<p>That kind of closure implements the <code>FnMut</code> trait.</p>
<p>Let's try to desugar the following closure which push elements in a vector:</p>
<pre data-lang="rust"><code data-lang="rust">let mut v = vec![];
let push_closure = |x| v.push(x);
(1..=5).for_each(push_closure);
assert_eq!(vec![1, 2, 3, 4, 5], v);
</code></pre>
<p>First we need to define a struct:</p>
<pre data-lang="rust"><code data-lang="rust">struct PusherStruct&lt;'a&gt; {
    v: &amp;'a mut Vec&lt;i32&gt;,
}
</code></pre>
<p>Because we are capturing by reference, we need to introduce a lifetime.</p>
<p>Now the <code>FnMut</code> implementation:</p>
<pre data-lang="rust"><code data-lang="rust">impl&lt;'a&gt; FnMut&lt;(i32,)&gt; for PusherStruct&lt;'a&gt; {
    extern "rust-call" fn call_mut(&amp;mut self, (x,): (i32,)) -&gt; Self::Output {
        self.v.push(x)
    }
}
</code></pre>
<p>It is very similar to the <code>FnOnce</code> trait except that the function is called <code>call_mut</code> instead of <code>call_once</code> and that it takes <code>&amp;mut self</code> instead of <code>self</code>.</p>
<p>Let's try to compile that:</p>
<pre><code>error[E0277]: expected a `FnOnce(i32)` closure, found `PusherStruct&lt;'a&gt;`
 --&gt; src/main.rs:8:5
  |
8 |     extern "rust-call" fn call_mut(&amp;mut self, args: (i32,)) -&gt; Self::Output {
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ expected an `FnOnce(i32)` closure, found `PusherStruct&lt;'a&gt;`
  |
help: the trait `FnOnce(i32)` is not implemented for `PusherStruct&lt;'a&gt;`
</code></pre>
<p>Turns out we need to implement <code>FnOnce</code> too. Remember that <code>FnOnce</code> defines functions which can be called <strong>at least</strong> once. In the example above, we called our closure 5 times, so it can definitely be called at least once.</p>
<p>Let's implement it:</p>
<pre data-lang="rust"><code data-lang="rust">impl&lt;'a&gt; FnOnce&lt;(i32,)&gt; for PusherStruct&lt;'a&gt; {
    type Output = ();
    extern "rust-call" fn call_once(mut self, args: (i32,)) -&gt; Self::Output {
        self.call_mut(args)
    }
}
</code></pre>
<p>Our closure does not return anything so the <code>Output</code> is the unit.<br/>
 As for the <code>call_once</code> implementation, we can just call <code>call_mut</code> to avoid repetition.</p>
<p>This should compile and we can now use it like so:</p>
<pre data-lang="rust"><code data-lang="rust">let mut v = vec![];
let pusher_struct = PusherStruct { v: &amp;mut v };
(1..=5).for_each(pusher_struct);
assert_eq!(vec![1, 2, 3, 4, 5], v);
</code></pre>
<p>Finally, there is a third trait implemented by closures which can be called multiple times and don't need a mutable reference; the <a href="https://doc.rust-lang.org/std/ops/trait.Fn.html">Fn trait</a>.</p>
<p>To see that let's try to desugar the <code>greeter_closure</code> from before:</p>
<pre data-lang="rust"><code data-lang="rust">let hello = "Hello ";
let greeter_closure = |x| String::new() + hello + x;
assert_eq!("Hello world", greeter_closure("world"));
assert_eq!("Hello rust", greeter_closure("rust")); // Can be called multiple times
</code></pre>
<p>As usual, we need to define our struct:</p>
<pre data-lang="rust"><code data-lang="rust">struct GreeterStruct&lt;'a&gt; {
    hello: &amp;'a str,
}
</code></pre>
<p>Let's not make the same mistake as before, and remember to implement <code>FnOnce</code> and <code>FnMut</code> first. The same way an <code>FnMut</code> closures are also <code>FnOnce</code> because they can be called <strong>at least</strong> once. <code>Fn</code> closures are also <code>FnMut</code> because if given a mutable reference, they can still perform their work which does not mutate the reference.</p>
<pre data-lang="rust"><code data-lang="rust">impl&lt;'a, 'b&gt; FnOnce&lt;(&amp;'b str,)&gt; for GreeterStruct&lt;'a&gt; {
    type Output = String;
    extern "rust-call" fn call_once(self, args: (&amp;'b str,)) -&gt; Self::Output {
        self.call(args)
    }
}
impl&lt;'a, 'b&gt; FnMut&lt;(&amp;'b str,)&gt; for GreeterStruct&lt;'a&gt; {
    extern "rust-call" fn call_mut(&amp;mut self, args: (&amp;'b str,)) -&gt; Self::Output {
        self.call(args)
    }
}
</code></pre>
<p>This should be pretty straightforward. <code>call_once</code> and <code>call_mut</code> are just calling <code>call</code> which is defined in <code>Fn</code>:</p>
<pre data-lang="rust"><code data-lang="rust">impl&lt;'a, 'b&gt; Fn&lt;(&amp;'b str,)&gt; for GreeterStruct&lt;'b&gt; {
    extern "rust-call" fn call(&amp;self, (x,): (&amp;'b str,)) -&gt; Self::Output {
        String::new() + &amp;self.hello + &amp;x
    }
}
</code></pre>
<p>And we can use it like this:</p>
<pre data-lang="rust"><code data-lang="rust">let hello = "Hello";
let greeter_struct = GreeterStruct {
    hello,
};
assert_eq!("Hello world", greeter_struct("world"));
assert_eq!("Hello rust", greeter_struct("rust")); // Can be called multiple times
</code></pre>
<p>You may already know that one can add the <code>move</code> keyword in front of a closure to force the closure to take ownership of the capture variables even if the closure only need a reference to it.<br/>
 For example:</p>
<pre data-lang="rust"><code data-lang="rust">let hello = "Hello ".to_owned();
let greeter_closure = move |x| String::new() + &amp;hello + x;
// We can't access `hello` here
// assert_eq!("Hello ", hello);
// error[E0382]: borrow of moved value: `hello`
assert_eq!("Hello world", greeter_closure("world"));
// Nor here
// assert_eq!("Hello ", hello);
// error[E0382]: borrow of moved value: `hello`
</code></pre>
<p>In order to clearly understand what we can do depending on whether the closure needs a shared reference, a mutable reference or a value and if there is <code>move</code> keyword or not, let's introduce those small dummy functions:</p>
<pre data-lang="rust"><code data-lang="rust">fn by_ref(_data: &amp;String) {}
fn by_mut(_data: &amp;mut String) {}
fn by_value(_data: String) {}
</code></pre>
<p>Now, let's see what we can do with different combination of move / not move and by_ref / by_mut / by_value:</p>
<pre data-lang="rust"><code data-lang="rust">let data = "by_ref".to_owned();
let by_ref_closure = || by_ref(&amp;data);
// Access data while the closure is still in scope
assert_eq!("by_ref", data);
// Call the closure once
by_ref_closure();
// Call the closure multiple times
by_ref_closure();
// Access data once the closure is out of scope
assert_eq!("by_ref", data);
</code></pre>
<p>Now with move:</p>
<pre data-lang="rust"><code data-lang="rust">let data = "move_by_ref".to_owned();
let move_by_ref_closure = move || by_ref(&amp;data);
// Access data while the closure is still in scope
// assert_eq!("move_by_ref", data);
// error[E0382]: borrow of moved value: `data`
// Call the closure once
move_by_ref_closure();
// Call the closure multiple times
move_by_ref_closure();
// Access data once the closure is out of scope
// assert_eq!("move_by_ref", data);
// error[E0382]: borrow of moved value: `data`
</code></pre>
<p>This makes sense, since the closure took ownership of <code>data</code> we can't access it anymore from outside.</p>
<p>Similarly we can define the following closures:</p>
<pre data-lang="rust"><code data-lang="rust">let mut data = "by_mut".to_owned();
let by_mut_closure = || by_mut(&amp;mut data);
let mut data = "move_by_mut".to_owned();
let move_by_mut_closure = move || by_mut(&amp;mut data);
let data = "by_value".to_owned();
let by_value_closure = || by_value(data);
let data = "move_by_value".to_owned();
let move_by_value_closure = move || by_value(data);
</code></pre>
<p>I will let you play with them, here what you should see:</p>
<table> <tr> <th></th> <th>by_ref</th> <th>by_mut</th> <th>by_value</th> <th>move by_ref</th> <th>move by_mut</th> <th>move by_value</th> </tr> <tbody> <tr> <th>Access when in scope</th> <td>✅</td> <td>❌</td> <td>❌</td> <td>❌</td> <td>❌</td> <td>❌</td> </tr> <tr> <th>Call once</th> <td>✅</td> <td>✅</td> <td>✅</td> <td>✅</td> <td>✅</td> <td>✅</td> </tr> <tr> <th>Call multiple times</th> <td>✅</td> <td>✅</td> <td>❌</td> <td>✅</td> <td>✅</td> <td>❌</td> </tr> <tr> <th>Access when out of scope</th> <td>✅</td> <td>✅</td> <td>❌</td> <td>❌</td> <td>❌</td> <td>❌</td> </tr> </tbody> </table>
<p>And the trait implemented by each closures:</p>
<table> <tr> <th></th> <th>by_ref</th> <th>by_mut</th> <th>by_value</th> <th>move by_ref</th> <th>move by_mut</th> <th>move by_value</th> </tr> <tbody> <tr> <th>FnOnce</th> <td>✅</td> <td>✅</td> <td>✅</td> <td>✅</td> <td>✅</td> <td>✅</td> </tr> <tr> <th>FnMut</th> <td>✅</td> <td>✅</td> <td>❌</td> <td>✅</td> <td>✅</td> <td>❌</td> </tr> <tr> <th>Fn</th> <td>✅</td> <td>❌</td> <td>❌</td> <td>✅</td> <td>❌</td> <td>❌</td> </tr> </tbody> </table>
<p>We can see that the <code>move</code> keyword has no impact on the implemented trait. It only changes the capture to be from reference to value.</p>
<p>For example, the desugaring of <code>by_ref_closure</code> is:</p>
<pre data-lang="rust"><code data-lang="rust">struct ByRefStruct&lt;'a&gt; {
    data: &amp;'a String,
}
impl&lt;'a&gt; FnOnce&lt;()&gt; for ByRefStruct&lt;'a&gt; {
    type Output = ();
    extern "rust-call" fn call_once(self, args: ()) -&gt; Self::Output {
        self.call(args)
    }
}
impl&lt;'a&gt; FnMut&lt;()&gt; for ByRefStruct&lt;'a&gt; {
    extern "rust-call" fn call_mut(&amp;mut self, args: ()) -&gt; Self::Output {
        self.call(args)
    }
}
impl&lt;'a&gt; Fn&lt;()&gt; for ByRefStruct&lt;'a&gt; {
    extern "rust-call" fn call(&amp;self, (): ()) -&gt; Self::Output {
        by_ref(self.data)
    }
}
</code></pre>
<p>whereas for <code>move_by_ref_closure</code>:</p>
<pre data-lang="rust"><code data-lang="rust">struct MoveByRefStruct {
    data: String,
}
impl FnOnce&lt;()&gt; for MoveByRefStruct {
    type Output = ();
    extern "rust-call" fn call_once(self, args: ()) -&gt; Self::Output {
        self.call(args)
    }
}
impl FnMut&lt;()&gt; for MoveByRefStruct {
    extern "rust-call" fn call_mut(&amp;mut self, args: ()) -&gt; Self::Output {
        self.call(args)
    }
}
impl Fn&lt;()&gt; for MoveByRefStruct {
    extern "rust-call" fn call(&amp;self, (): ()) -&gt; Self::Output {
        by_ref(&amp;self.data)
    }
}
</code></pre>
<p>Notice how the <code>data</code> field changed from <code>&amp;'a String</code> to <code>String</code> and the call to <code>by_ref</code> from <code>self.data</code> to <code>&amp;self.data</code> eventhough in the closure forms we had <code>by_ref(&amp;data)</code> in both cases.</p>
<p>So we now hopefully understand what the <code>move</code> keyword does but you might wonder why that can be useful? After all, the first table above shows that we only removed flexbility.</p>
<p>Spawning a thread:</p>
<pre data-lang="rust"><code data-lang="rust">let data = "by_ref".to_owned();
std::thread::spawn(|| by_ref(&amp;data)).join().unwrap();
</code></pre>
<p>Without <code>move</code>, we get the following compiler error which helpfully suggest adding <code>move</code>:</p>
<pre><code>error[E0373]: closure may outlive the current function, but it borrows `data`, which is owned by the current function
 --&gt; src/main.rs:9:20
  |
9 | std::thread::spawn(|| by_ref(&amp;data)).join().unwrap();
  |                    ^^         ---- `data` is borrowed here
  |                    |
  |                    may outlive borrowed value `data`
  |
note: function requires argument type to outlive `'static`
 --&gt; src/main.rs:9:1
  |
9 | std::thread::spawn(|| by_ref(&amp;data)).join().unwrap();
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
help: to force the closure to take ownership of `data` (and any other referenced variables), use the `move` keyword
  |
9 | std::thread::spawn(move || by_ref(&amp;data)).join().unwrap();
  |                    ++++
</code></pre>
<p>Creating a function returning a closure:</p>
<pre data-lang="rust"><code data-lang="rust">fn make_greeter(greeter: &amp;str) -&gt; impl Fn(&amp;str) -&gt; String {
    move |name| format!("{greeter} {name}")
}
let hello_greeter = make_greeter("Hello");
let hi_greeter = make_greeter("Hi");
assert_eq!(hello_greeter("rust"), "Hello rust");
assert_eq!(hi_greeter("rust"), "Hi rust");
</code></pre>
<p>Here too we need <code>move</code> otherwise we get the same borrow checker error.</p>
<p>Sigh</p>
<p>This article is long enough as is, so I am stopping here for now. I plan to publish a follow up article for async closures later. If you want to read more on the subject I recommend:</p>
