/**
 * main.js
 * All the custom JavaScript for the HEE NHS website are included in this file
 */

/**
 * Filter
 * Elements with the selector '.nhsuk-filter' are passed into this class
 */
class Filter {
  constructor(container) {
    this.container = container;

    this.checkboxes = [...this.container.getElementsByClassName('nhsuk-checkboxes__input')];
    this.groups = [...this.container.getElementsByClassName('nhsuk-filter__group')];
    this.submit = this.container.querySelector('.nhsuk-filter__submit');

    this.setUp();
    this.addEventListeners();
  }

  addEventListeners() {
    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', evt => this.updateResults(evt));
    });

    this.groups.forEach(group => {
      const legend = group.querySelector('.nhsuk-fieldset__legend');
      if (legend) {
        legend.addEventListener('click', evt => this.toggleGroup(evt));
      }
    });
  }

  setUp() {
    this.container.classList.add('nhsuk-filter--js');

    // Close groups
    this.groups.forEach(group => group.classList.add('nhsuk-filter__group--closed'));

    // Hide submit button
    if (this.submit) {
      this.submit.hidden = true;
    }
  }

  toggleGroup(evt) {
    evt.preventDefault();
    evt.target.closest('.nhsuk-filter__group').classList.toggle('nhsuk-filter__group--closed');
  }

  updateResults(evt) {
    this.container.submit();
  }
}
[...document.getElementsByClassName('nhsuk-filter')].forEach(filter => new Filter(filter));

/**
 * FilterTag
 * Elements with the selector '.nhsuk-filter-tag' are passed into this class
 */
 class FilterTag {
  constructor(tag) {
    this.tag = tag;
    this.icon = tag.querySelector('.nhsuk-filter-tag__icon');

    this.setUp();
    this.addEventListeners();
  }

  addEventListeners() {
    this.tag.addEventListener('click', (evt) => this.removeFilter(evt));
  }

  removeFilter(evt) {
    evt.preventDefault();

    document.querySelectorAll(`input[value='${this.tag.dataset.filter}']`).forEach(checkbox => {
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
    });

    evt.target.remove();
  }
  
  setUp() {
    this.tag.classList.add('nhsuk-filter-tag--js');

    if (this.icon) {
      this.icon.hidden = false;
    }
  }
}
[...document.getElementsByClassName('nhsuk-filter-tag')].forEach(tag => new FilterTag(tag));

/**
 * Listing
 * Elements with the selector '.nhsuk-listing' are passed into this class
 */
class Listing {
  constructor(container) {
    this.container = container;
    this.sort = this.container.querySelector('.nhsuk-listing__sort');

    this.addEventListeners();
    this.toggleJavascriptElements();
  }

  addEventListeners() {
    if (this.sort) {
      [...this.sort.getElementsByTagName('select')].forEach(select => select.addEventListener('change', evt => this.updateResults(evt)));
    }
  }

  toggleJavascriptElements() {
    if (this.sort) {
      const submit = this.sort.querySelector('.nhsuk-listing__sort__submit');
      if (submit) {
        submit.hidden = true;
      }
    }
  }

  updateResults() {
    this.sort.submit();
  }
}

/**
 * Tabs
 * Elements with the selector '.nhsuk-tabs__list-item' and position are passed into this class
 */
 class Tabs {
  constructor(tab,i) {
    this.tab = tab;
    this.pos = i;
    this.tabs = [...document.getElementsByClassName('nhsuk-tabs__list-item')];
    this.tabPanels = [...document.getElementsByClassName('nhsuk-tabs__panel')];
    this.addEventListeners();
  }

  addEventListeners() {
    const query = window.matchMedia('(min-width:40.0625em)');
    query.onchange = (evt) => {
      this.tabs.forEach(node => {
        node.classList.remove('nhsuk-tabs__list-item--selected');
      });
      this.tabPanels.forEach(node => {
        node.classList.add('nhsuk-tabs__panel--hidden');
      });
      if( query.matches ) { this.tab.addEventListener('click', evt => this.actionTabClick(evt)); }
    };
    query.onchange();    
  }

  actionTabClick(evt) {
    evt.preventDefault();
    this.tabs.forEach(node => {
      node.classList.remove('nhsuk-tabs__list-item--selected');
    });
    evt.currentTarget.classList.add('nhsuk-tabs__list-item--selected');
    this.tabPanels.forEach(node => {
      node.classList.add('nhsuk-tabs__panel--hidden');
    });
    this.tabPanels[this.pos].classList.remove('nhsuk-tabs__panel--hidden');
  }
}

[...document.getElementsByClassName('nhsuk-listing')].forEach(listing => new Listing(listing));
[...document.getElementsByClassName('nhsuk-tabs__list-item')].forEach((tab,i) => new Tabs(tab,i));
