# Block Links

## Quick start examples

#### HTML markup
##### Two Columns
```html
<div class="nhsuk-blocklinks">
  <div class="nhsuk-u-reading-width">
    <h2>Learning</h2>
    <p>Discover resources and information designed to support you on your learning journey</p>
  </div>
  <ul class="nhsuk-list-blocklinks nhsuk-list-blocklinks--two-columns">
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Learning Zone
      </a>
    </li>
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Equality, Diversity and Inclusion
      </a>
    </li>
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Talent Management Toolkit
      </a>
    </li>
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Case studies
      </a>
    </li>
  </ul>
</div>
```
##### One Column
```html
<div class="nhsuk-blocklinks">
  <div class="nhsuk-u-reading-width">
    <h2>Learning</h2>
    <p>Discover resources and information designed to support you on your learning journey</p>
  </div>
  <ul class="nhsuk-list-blocklinks nhsuk-list-blocklinks--one-column">
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Learning Zone
      </a>
    </li>
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Equality, Diversity and Inclusion
      </a>
    </li>
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Talent Management Toolkit
      </a>
    </li>
    <li>
      <a href="#">
        <svg class="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path
            d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z">
          </path>
        </svg>
        Case studies
      </a>
    </li>
  </ul>
</div>
```


#### Nunjucks macro
##### Two Columns
```
{%- from 'blocklinks/macro.njk' import blocklinks %}

{{ blocklinks({
  "heading": "Learning 2 Columns",
  "HTML": "<p>Discover resources and information designed to support you on your learning journey</p>",
  "columns": "2",
  "links": [
    {
      "url": "/listing",
      "label": "Learning Zone"
    },
    {
      "url": "/listing",
      "label": "Equality, Diversity and Inclusion"
    },
    {
      "url": "/listing",
      "label": "Talent Management Toolkit"
    },
    {
      "url": "/listing",
      "label": "Case studies"
    }]
  })
}}
```
##### One Column
```
{%- from 'blocklinks/macro.njk' import blocklinks %}

{{ blocklinks({
  "heading": "Learning 1 Column",
  "HTML": "<p>Discover resources and information designed to support you on your learning journey</p>",
  "columns": "1",
  "links": [
    {
      "url": "/listing",
      "label": "Learning Zone"
    },
    {
      "url": "/listing",
      "label": "Equality, Diversity and Inclusion"
    },
    {
      "url": "/listing",
      "label": "Talent Management Toolkit"
    },
    {
      "url": "/listing",
      "label": "Case studies"
    }]
  })
}}
```
---

### Nunjucks arguments

The blocklinks macro takes the following arguments:

| Name                | Type     | Required  | Description  |
| --------------------|----------|-----------|--------------|
| **heading**         | string   | Yes       | Text heading of the blocklinks component. |
| **HTML**            | string   | Yes       | HTML content to be used within the blocklinks component. |
| **columns**         | string   | Yes       | Number of columns "2" or "1". |
| **links**           | array    | Yes       | Array of navigation links for use in the blocklinks component. |
| **links[].url**     | string   | Yes       | The href of a navigation item in the blocklinks component. |
| **links[].label**   | string   | Yes       | The label of a navigation item in the blocklinks component. |

If you are using Nunjucks macros in production be aware that using `html` arguments, or ones ending with `html` can be a [security risk](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting). Read more about this in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning).
