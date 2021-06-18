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

[...document.getElementsByClassName('nhsuk-listing')].forEach(listing => new Listing(listing));

/**
 * Submenu's
 * Elements with the selector '.nhsuk-subheader' are passed into this class
 */


class Submenu {
  constructor(container) {
    this.container = container
    this.toggleLink = this.container.querySelector('a')
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.toggleLink) {
      this.toggleLink.addEventListener('click', event => this.toggleMenu(event))
    }
  }

  toggleMenu(event) {
    event.preventDefault()
    const thisElem = event.target
    const thisParent = thisElem.parentNode
    const thisList = thisParent.parentNode
    const thissubMenu = thisParent.querySelector(".nhsuk-subheader__list")
    this.toggleClass(thisParent, 'is-active')
    this.toggleClass(thisList, 'submenu-open')
    this.toggleAttribute(thisParent, 'aria-expanded')
  };

  getClasses(element) {
    // Return without error if element or class are missing
    if (!element) return [];
    return element.className.split(' ').filter(Boolean);
  };

  hasClass(element, className) {
    // Return without error if element or class are missing
    if (!element || !className) return false;
    return this.getClasses(element).includes(className);
  };

  removeClass (element, className) {
    // Return without error if element or class are missing
    if (!element || !className) return;
    if (this.hasClass(element, className)) {
      // Array of all existing classes
      const existingClasses = this.getClasses(element, className);
      // String of existing classes minus the class to remove
      const newClasses = existingClasses.filter((existingClass) => existingClass !== className).join(' ');
      // Set class attribute to the new classes
      element.setAttribute('class', newClasses);
    }
  };
  
  addClass(element, className) {
    // Return without error if element or class are missing
    if (!element || !className) return;
    if (!this.hasClass(element, className)) {
      // Set class attribute to the new classes
      element.setAttribute('class', `${element.className} ${className}`.trim());
    }
  };

  toggleClass(element, className) {
    if (!element || !className) return;
    if (this.hasClass(element, className)) {
      this.removeClass(element, className);
    } else {
      this.addClass(element, className);
    }
  };

  toggleAttribute(element, attr) {
    // Return without error if element or attr are missing
    if (!element || !attr) return;
    // Toggle attribute value. Treat no existing attr same as when set to false
    const value = (element.getAttribute(attr) === 'true') ? 'false' : 'true';
    element.setAttribute(attr, value);
  };

}

[...document.getElementsByClassName('nhsuk-subheader')].forEach(submenu => new Submenu(submenu))