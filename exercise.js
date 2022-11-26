/* WT FEEDBACK
  Coding style question: You use CamelCase for modules (and presumably classes), but then snake_case for functions/methods/variables.. what's the personal philosophy/reason behind that mixing of styles?
*/
/* PIETER RESPONSE
  The reasoning is as follows:

  In the majority of languages I work with that aren't JS, PascalCase of modules and snake_case of functions/methods/variables is often the standard, and JS is the outlier with camelCase because of arbitrary community convention. A community that we know changes things all the time, because let's be real, that's what the JS ecosystem just seems to plain like to do - we can see that via their rejection of semicolons and all the years of fighting that has come with that decision, for example.

  For context, here's the languages that make up most of my development stack, and the conventions that tend to come with them:
    - Bash (snake_case functions/methods/variables)
    - Rust (PascalCase modules/impl/structs/etc, snake_case functions/methods/variables)
    - Python (PascalCase class/type variable/exception/etc, snake_case functions/methods/variables)
    - Elixir (PascalCase modules, snake_case functions/methods/variables/atoms)
    - R (snake_case functions/methods/variables)

  Meanwhile with Javascript we have, as a community standard: PascalCase modules/classes, camelCase functions/methods/variables.

  This makes Javascript the single outlier in a tech stack (only in the camelCasing of functions/methods/variables in particular) that can be used to build most things an organization will ever need, be it iOS / Android apps, desktop apps, machine learning, robust distributed servers, or data analysis; be they 10 employees or 10,000 employees.

  So with a wider view of the entire tech stack that I work with across multiple languages, what do I gain by going against JS community convention on this specific aspect?
  - I can enforce a uniform set of standards across language domains in a very simple manner, and have stronger consistency as a result that can be enforced via CI and automation, so there's no more internal arguments amongst a team over code standards that don't actually contribute much of anything to solving actual problems.
  - I gain simplicity of mental stack management. Instead of having to switch contexts to camelCase when I'm bouncing between API and front-end specific code that's consuming that API, I can simply focus on following a consistent set of standards that I follow across every language. This makes it easier to maintain flow.
  - I can also think about my modules/functions/methods/variables in a *cross language* context, and easily identify opportunities for simplification, optimization, or consolidation. Keeping things named the *exact same* across language barriers forces me to think in terms of data flow in a way that you simply don't think about otherwise if you just conform to each language's specific standards.
  - It also forces me to think more carefully about how I name things, which makes me focus more on the architecture of the application I'm building instead of just the code itself. How you name things matters. Alot. Especially as your codebase grows.
  - As a result of having to think carefully about how I name things, I can now easily find instances of that name by doing a simple text search for a module/function/method/variable name with some level of assumptions baked into that text search, and see the very specific instances related to that piece of data in every language context that it's used in. That can be valuable in a multitude of ways as well, as I'm sure you can imagine.

  And what do I lose by going against JS community convention on this specific aspect?
  - A large majority (pretty much all haha) of developers get *very surprised* when they see underscores in their Javascript, almost comically so. (but they had that same reaction when people stopped using semi-colons anyways and that got over that, so does that reaction *really* matter in the grand scheme of things?)

  As an aside, I do personally find it a bit amusing that most developers are okay with snake_case in a Rust / Elixir / Python environment, but when snake_case is used in a JS environment everyone raises their eyebrows (as I mentioned, I've had this happen before with developers that worked for me, funnily enough haha) - but over time, they did indeed get over it, just like they did their strong opinions about semicolons all those years ago; and realized that none of it really matters and that the trade off was worthwhile to be able to get the benefits I described above. Conventions are broken all the time. Doing what makes sense in the context you're in and solving actual problems matters more. There's no perfect answer. It's all about what trade offs you're willing to live with.

  That said, of course there is always a very easy argument to be made for following language conventions. It's a simple and intuitive decision to do, makes it easy for other developers to get onboarded in a manner they're familiar with, and in most scenarios it's easily the correct choice. However despite those benefits I've found that over the years with everything I've done and as the codebase has grown over time that reinventing the very same code across different language contexts will inevitably start to happen, further (and needlessly) increasing the complexity and technical debt in the codebase over time; and that having to juggle multiple arbitrary language conventions (it's all just code after all) becomes by default very inefficient when you're working in any sort of multi-language context. It always seems to devolve into a series of pointless arguments amongst developers based on their individual preferences, and a bunch of wasted time.

  So instead, I just choose not to have an opinion. I want it to be clear that I don't have a horse in the race for snake_case vs. camelCase or PascalCase, or any other naming convention or standard. I simply do not care. I use snake_case for functions/methods/variables right now because that's what the majority of my tech stack uses as a standard, and JS is the only language that doesn't and has parity with every other language I use on other naming aspects. If things were the other way around and PascalCase and camelCase were the standard in the majority of the tech stack that I use, I'd adopt that as the standard instead.

  To be clear; everything I've said only applies for my own projects. I understand other clients have different standards that were put in place long before I came along, and I respect that. I'm not here to rock a boat by tossing snake_case everywhere in a codebase that is already using camelCase. If you had given me a small bit of your codebase to work on, I would have conformed to *your* standards as I saw them to be, and we wouldn't even be having this conversation about snake_case in the first place because I simply wouldn't use snake_case if you were already using camelCase.

*/

/* WT FEEDBACK
  LIKE:
  - Clever optional way to do required params, when needed/wanted. Interesting idea to keep it in signature.
  - Technically extensible
  DISLIKE:
  - Error Prone:
    - Dev user needs to construct own call_path properly or debugging will be a nightmare - case and point in verify_data_conforms_to_spec function below.
    - If I pass in just function and param name (validate.data), my Error for debugging will be incorrect (function will be module, and param name will be function..)
  - Obscure:
    - call_path assumes 3 parts.. then why not just do 3 params with some defaults? like required( module, function, param ), so the dev can see their args when calling?
    - assumes string based structure to be known/understood by caller, only to be split() up immediately into assumed parts.
  - Rigid: Why do we need each using function to be in module?
  - (Total Unimportant Nitpick) If standardizing arg error, why not use TypeError?
  PERSONAL VERDICT:
  - Dev-only or not, I would never want to use this mechanism; requires me to understand/know too much while giving me too much opportunity to shoot myself in the foot.
*/
/* PIETER RESPONSE
  Your points are all correct and I had the same thoughts myself as well (I particularly truly hate the call_path, you shouldn't have to specify a string to know what your callstack was, it should be dynamic), but I wanted to put this function in anyways as I made it up on the spot to see how you reacted to it, plus the exercise had a time constraint of 90 minutes so I wanted to keep things brief and couldn't flesh it out as fully as it deserved. Knowing you had the same concerns I did is a valuable thing to me because it means we actually think about this the same way.

  All that said, my answer to your points would be: Javascript is demonstrateably insufficient for proper type management in general in raw JS, my simple function is in no way going ever going to be able to work around that fact no matter what improvements we do, and a tool that can better express types in a readable manner like TypeScript should be used.

  Even if we did all the improvements in the world that could be done to this function in raw JS, it would still fall flat on it's face against TypeScript because argument / type errors would be exposed at runtime in our raw JS, instead of at compile time like you get with TypeScript. Anything we could ever hope to do would be worse by default compared to TypeScript, because we wouldn't be writing our own compiler that checks for type errors at compile time like TypeScript does. We simply wouldn't be able to compete with TypeScript.

  So how would I improve on this function? I would simply delete it and just use TypeScript.
*/
// We can avoid needing this by using TypeScript, but since we're using raw Javascript for this example we'll just implement some basic parameter checking for user facing code. We wouldn't use a method like this in an actual production level code base.
const required = (call_path = '') => {
  const [ module_name, function_name, parameter_name ] = call_path.split('.')
  throw new Error(`The module '${module_name}' function '${function_name}' requires the parameter '${parameter_name}', but none was provided.`)
}

/* WT FEEDBACK
  Respecting your comment just below about splitting out modules in a real use case;
  regardless, why not use a static class instead in this case?
*/
/* PIETER RESPONSE
  Since I had no codebase to reference or existing standards to work with, I chose to keep it simple with basic objects, and see if a discussion was started around that decision. If there was a pattern in place I would follow it, but I also didn't feel the need for a class in this case since there's nothing specific that I'd be looking to initialize in a constructor that would need to be unique across instances, and static properties don't exactly offer any guarantees that the values won't be changed later, they're just methods/variables that are kept the same across all class instances and are invoked similar to how you would if you used a POJO anyways. So there's not a lot of wins to be had in this specific scenario with a class over a POJO.

  There's also a discussion that could be had about how people tend to take classes and the ability to extend them and can run away with that in a manner that actually becomes not helpful and bloated over time, because with any techniques that use inheritance (like class extension does) you actually end up getting the classic "You only needed the lion, but due to inheritance you now have to bring along the whole jungle" programming problem as a multitude of developers run off with the class and extend it in any which way they desire and build a multitude of layers of abstraction on top of that baseline class. It can become absolute chaos over time.

  Honestly, if anything, I'd look to make the functionality in these modules more granular and better broken down as functions that can be easily imported and composed so developers would have more utility based building blocks they can use to build up whatever higher level functionality they need without running into the inheritance problem. Inheritance and composition both have their place, but I've found for most scenarios composition tends to win out in the long run in terms of usability, flexibility, and testability (unit tests / property tests especially). Functional programming can bring a ton of benefits with it to a codebase, especially long term. Less is more.
*/
// Normally we'd have these types of modules split amongst multiple files and importing them via some sorta bundler, but since this is an example we'll just do it all in this one file here, but in a production environment WnApi, WnSpec, WnData, WnUtils, WnSelect, and any non generic / bootstrap related code would live in their own respective files in the project structure, organized in a manner that makes sense.
const WnApi = {
  api_url_base: 'https://widenode.io',

  gen_api_url({
    endpoint = required('WnApi.gen_api_url.endpoint'),
  } = {}) {
    return `${this.api_url_base}/${endpoint}`
  },

  /* WT FEEDBACK
    LIKE:
    - Thorough in defining options default for destructuring for when user does just fetch()
    DISLIKE:
    - constructing 'WnApi.fetch.endpoint' manually, and correctly (see "required" feedback above for more..)
  */
  /* PIETER RESPONSE
    Yep. TypeScript. The `required` function should not have to exist at all, I only did it for the purposes of this exercise.
  */
  async fetch({
    endpoint = required('WnApi.fetch.endpoint'),
  } = {}) {
    try {
      const api_url = this.gen_api_url({ endpoint })
      const result = await fetch(api_url)
      const json = await result.json()
      return json
    } catch (error) {
      console.error(`error retrieving data from ${api_url}:`, error)
      throw error
    }
  },
}

const WnSpec = {
  verify_data_conforms_to_spec ({
    data = required('WnSpec.verify_data_conforms_to_spec.data'),
    /* WT Feedback
      Case for my dislike of the required mechanism -- spec param has invalid parameter value in constructed string. The mistake is not the problem; I would do this
      accidentally all the time, and the fallout is that I'm debugging wrong fields without good way to trace back.. Shoot-myself-in-foot case.
    */
    /* PIETER RESPONSE
      Yep. TypeScript. The `required` function should not have to exist at all, I only did it for the purposes of this exercise.
    */
    spec = required('WnSpec.verify_data_conforms_to_spec.data'),
  } = {}) {
    // Note: We could augment this function to handle arrays and objects as well, if the spec use case were to present itself to require it

    const data_fields = Object.entries(data)
    const spec_fields = Object.entries(spec)

    // Before we even bother validating anything, make sure that the number of fields in the data object we've received match the amount of fields specified in the spec. If it doesn't, we want to give up immediately and short circuit.
    if (data_fields.length !== spec_fields.length) {
      console.warn('data and spec fields do not match.', data, spec, data_fields)
      return false
    }

    const spec_field_matches = []

    for (const [ data_key, data_value ] of data_fields) {

      const spec_value = spec[data_key]

      if (spec_value) {

        /* WT FEEDBACK
          This is a strange approach. It took me a couple squinty looks to "click" on what you're doing here with the type-as-function call.
          If you're checking for a function and then calling it see a default init value of the type constructor... and THEN doing a separate check on the data..
            ... then why not just make the validator a function that processes the data with a boolean is-valid response? Like always just "if( spec_validator( data_value ) )"
            ... and then, why not just make EVERY validator a simple function consistently for every validator so you don't need all this case-by-case validation code below?
        */
        /* PIETER RESPONSE
          The only reason I didn't do it the way you described (which is the way I would normally seek to do it as it's more extensible) is that you mentioned you were using Vue when we chatted, and Vue implements their props validation in this style (https://vuejs.org/guide/components/props.html#props-declaration), so in absence of knowing what a desired user facing spec would be like, I decided to show off a different approach from traditional functional validation by implementing a quick and simple version of validation that is in the framework you're currently using to try and demonstrate knowledge of how to implement *their* version of property validation.

          I only took this approach since to me it felt like it'd be (forgive the phrasing) "too easy" to just show off a functional validation approach in an exercise like this that's meant to assess my skills, I suppose? And since I do only have one shot at demonstrating my skills to you via this exercise, I may as well show a different method then the usual that's implemented in the framework you're currently using and see if a discussion emerges around it, which it did.

          That said, I should have documented that intent here more. I thought it'd come across more obviously due to the Vue prop types that are being used in the user facing specs, but it clearly didn't so it looks like my attempt at showing off a different approach for the sake of the exercise backfired in this case. On the other hand, I've had other exercises before where doing the obvious thing backfired too, such seems to be the nature of exercises sometimes.

          All that said, functional validation would be the generic, extensible, and preferred way to do it, of course.
        */

        // Validate generic number match
        if ((typeof spec_value === 'function' && spec_value() === 0) && typeof data_value === 'number') {
          spec_field_matches.push([ data_key, data_value ])
        }

        // Validate generic string match
        if ((typeof spec_value === 'function' && spec_value() === '') && typeof data_value === 'string') {
          spec_field_matches.push([ data_key, data_value ])
        }

        // Validate generic value match
        if ((typeof spec_value === 'string' || typeof spec_value === 'number') && data_value === spec_value) {
          spec_field_matches.push([ data_key, data_value ])
        }
      }
    }

    if (spec_field_matches.length === spec_fields.length) return true
    console.warn('data matches spec in shape, but not in values.', data, spec, data_fields, spec_field_matches)
    return false
  },
}

const WnData = {
  find_data_conforming_to_spec({
    data = required('WnData.find_data_conforming_to_spec.data'),
    spec = required('WnData.find_data_conforming_to_spec.spec'),
    results = [],
  } = {}) {

    /* WT FEEDBACK
      LIKE:
      - This logic is very clear and minimal for this use case.
      DISLIKE:
      - MINOR: The logic here would require rework if we were looking for non-object values.
        ... I think separating a more general validator for the whole "right" value would be more extensible.
    */
    /* PIETER RESPONSE
      I agree with you on those points. But I didn't want to prematurely optimize either. With the data available to me that I knew I had to parse, this is the approach that seemed worth taking for the exercise. If there was a wider subset of data we were looking to validate against, I'd definitely be looking to do more generic validators / type coercions.

      `Object.entries` can get us pretty far since most things in JS are an object and the data comes to us as JSON, but it's not going to get us all of the way either when it comes to validating things like numbers and booleans (it can handle strings but I wouldn't consider the way it handles them to be ideal either).

      I chose not to worry about that for this function (and for the sake of my time with the exercise) and to instead focus on the parameters outlined in the spec, because ironically enough on other exercises I've done before for other clients I've been dinged for doing *too* much generic code based on future hypotheticals and not focusing on just fulfilling the specific use case they've presented in the exercise. Just how it goes sometimes.

      I think what matters most is that a discussion gets started though, and a better understanding of what each client is specifically looking for can start from there. Every exercise and client is different, but you learn their needs over time and adapt accordingly.
    */
    const parsed = Object.entries(data).reduce((results, [ key, value ]) => {
      if (Array.isArray(value)) return this.find_data_conforming_to_spec({ data: value, spec, results })

      if (typeof value === 'object' && value !== null) {

        if (WnSpec.verify_data_conforms_to_spec({ data: value, spec })) {
          results.push(value)
          return results
        }

        return this.find_data_conforming_to_spec({ data: value, spec, results })
      }

      return results
    }, results)

    return parsed
  },
}

const WnUtils = {
  find_distinct_data_by_key({
    data = required('WnUtils.find_distinct_data_by_key.data'),
    key = required('WnUtils.find_distinct_data_by_key.key')
  } = {}) {
    const distinct_keys = new Set()

    const distinct_values = data.reduce((results, value) => {
      /* WT FEEDBACK
        (Minor Nitpick Only) Why not wrap the Set.add and results.push in the !Set.has condition, and then return results only once at the end?
      */
      /* PIETER RESPONSE
        I find early exits tend to be more extensible, less error prone, and more readable, especially as business logic changes over time and more if statements / additional computation or logic gets added. In general, if a value is incorrect, or I've already got the result I want; I may as well exit out of the function early - why risk doing computation I don't need to do if I've already got what I need? If this function had other logic to safeguard or otherwise defend the function I'd have early exits there as well instead of a big if statement with a bunch of conditions.

        Also, if I utilize early exits in this way they can also be made composable and can be moved around more easily then if they're wrapped up in an if statement. What we're really discussing here is basically defensive programming vs. Elixir / Erlang early exit style programming. In Elixir / Erlang it's better to be *less* defensive about your programming (unintuitively so), and exit out early wherever you can as soon as it makes sense to do so in order to get the results back to the caller quickly so they can handle the failure (or success) accordingly.

        I've since found that practice to be useful in a variety of languages, not just Elixir / Erlang, so you can see a it's usage here.
      */
      if (distinct_keys.has(value[key])) return results

      distinct_keys.add(value[key])
      results.push(value)
      return results
    }, [])

    return distinct_values
  },
  sort_data_alphabetically_by_key({
    data = required('WnUtils.sort_data_alphabetically_by_key.data'),
    key = required('WnUtils.sort_data_alphabetically_by_key.key')
  }) {
    const sorted_data = [...data].sort((a_data, b_data) => {
      return a_data[key].localeCompare(b_data[key])
    })

    return sorted_data
  },
}

const WnSelect = {
  component () {
    return class extends HTMLElement {
      constructor() {
        super()

        this._options = []

        const template = document.getElementById('wn-select')
        this._shadow = this.attachShadow({ mode: 'open' })
        this._shadow.appendChild(template.content.cloneNode(true))

        this._select_el = this._shadow.getElementById('wn-select-el')
      }

      set options(options = []) {
        this._options = options

        this._select_el.innerHTML = ''

        for (const option of options) {
          const option_el = document.createElement('option')

          option_el.value = option.key
          option_el.innerHTML = option.value

          this._select_el.appendChild(option_el)
        }
      }

      get options() {
        return this._options
      }
    }
  },
  register_component () {
    customElements.define('wn-select', this.component())
  },
  transform_data_to_options({
    data = required('WnSelect.transform_data_to_options.data'),
    transform_spec = required('WnSelect.transform_data_to_options.transform_spec'),
  } = {}) {
    return data.map(transform_spec)
  },
  render_options_to_component({
    options = required('WnSelect.render_options_to_component.options'),
    selector = required('WnSelect.render_options_to_component.selector'),
  } = {}) {
    const el = document.querySelector(selector)
    el.options = options
  },
}

/* WT FEEDBACK
  IMO, this validator (though TypeScript-like) is annoying to process...
  why not something with a singular (and more extensible) "function" field validation mechanism, like this:

const user_data_spec = () => {
  return {
    $type: v => v === 'user',
    id: Number.isFinite,  // OR the more dangerous typeof v === number
    name: v => typeof v === 'string',
  }
}
*/
/* PIETER RESPONSE
  I've spoken as to why I implemented the spec this way as a quick demonstration of an implementation of Vue's property validation in a previous comment, so the simple answer I'll give is of course the validation should also accept functions, just like Vue's already does; and I just assumed that would be understood within the parameters of the exercise since that's how Vue's validation works and I could just convey the general idea without building every aspect of Vue's validation system out since there's much more complexity to how Vue handles validation then what I've implemented in this exercise.

  To be clear: I'm not saying the way that Vue handles validation is the best or only way to be doing validation. I only structured the spec this way purely because you mentioned to me that you were using Vue. If you'd mentioned you were using a different framework, I'd have structured my validation around that for the sake of the exercise. As I said before, functions were the obvious choice, so I tried to do something different here to stand out a bit and start a discussion (which it did).
*/
const user_data_spec = () => {
  return {
    $type: 'user',
    id: Number,
    name: String,
  }
}

console.log( Number.isFinite( "101" ) )

/* WT FEEDBACK
  (minor nitpick only) Why a return in this arrow function? Why not arrow directly to result?
*/
/* PIETER RESPONSE
  Because eventually this function is likely to change and require an explicit return anyways. Same reason people leave dangling commas in arrays and objects everywhere nowadays. Eventually those arrays or objects are likely going to need a new value, just like how eventually this function is likely to require new logic as business needs change. That said, if it's a convention that matters to you, and it's a standard in your codebase, I'd conform to it. Makes no difference to me either way.
*/
const user_transform_option_spec = (data_value) => {
  return {
    key: data_value.id,
    value: `${data_value.name} (${data_value.id})`,
  }
}

const some_other_options = [{
  key: 'ahoy',
  value: 'This is the only option!',
}]

const arbitrary_options = [{
  key: 'hello',
  value: 'Hello World',
}, {
  key: 'goodbye',
  value: 'Goodbye Universe',
}]

// Bootstrap any web components we have
WnSelect.register_component()

// Since we don't need to wait for anything to render on the DOM or for any other resources to be loaded, we can just trigger this via an IIFE instead of waiting for the window load event like we normally would want to for client side related code, and things will be fine.
/* WT FEEDBACK
  LOL! Now I know a good down-side to sans-";" JavaScript.. Cuz this would never work without the leading ; (just laughing I never knew this)
*/
/* PIETER RESPONSE
  Haha yep this is one of the few scenarios where the semicolon actually comes into play!
*/
;(async () => {
  try {
    // Load client side options immediately
    WnSelect.render_options_to_component({ options: some_other_options, selector: '#some-other-select' })
    WnSelect.render_options_to_component({ options: arbitrary_options, selector: '#arbitrary-options-select' })

    // Fetch remote api options and update options as soon as we're able to
    const api_data = await WnApi.fetch({ endpoint: 'testing/exercises/exercise1.json' })
    const instances = WnData.find_data_conforming_to_spec({ data: api_data, spec: user_data_spec() })
    const distinct_instances = WnUtils.find_distinct_data_by_key({ data: instances, key: 'id' })
    const sorted_distinct_instances = WnUtils.sort_data_alphabetically_by_key({ data: distinct_instances, key: 'name' })
    const select_el_options = WnSelect.transform_data_to_options({
      data: sorted_distinct_instances,
      transform_spec: user_transform_option_spec,
    })

    WnSelect.render_options_to_component({ options: select_el_options, selector: '#users-select' })
  } catch (error) {
    console.error('error generating data options.', error)
    throw error
  }
})()
