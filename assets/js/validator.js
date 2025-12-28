const FormValidator = {
  validators: {
    required(value, fieldName) {
      if (!value || value.toString().trim() === '') {
        return { valid: false, message: `${fieldName} مطلوب` };
      }
      return { valid: true };
    },

    email(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, message: 'البريد الإلكتروني غير صحيح' };
      }
      return { valid: true };
    },

    phone(value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
      if (!phoneRegex.test(value)) {
        return { valid: false, message: 'رقم الهاتف غير صحيح' };
      }
      return { valid: true };
    },

    minLength(value, length, fieldName) {
      if (value.length < length) {
        return { valid: false, message: `${fieldName} يجب أن يكون على الأقل ${length} أحرف` };
      }
      return { valid: true };
    },

    maxLength(value, length, fieldName) {
      if (value.length > length) {
        return { valid: false, message: `${fieldName} يجب أن لا يتجاوز ${length} أحرف` };
      }
      return { valid: true };
    },

    password(value) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        return { valid: false, message: 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم' };
      }
      return { valid: true };
    },

    confirm(value, compareValue, fieldName) {
      if (value !== compareValue) {
        return { valid: false, message: `${fieldName} غير متطابق` };
      }
      return { valid: true };
    },

    url(value) {
      try {
        new URL(value);
        return { valid: true };
      } catch {
        return { valid: false, message: 'الرابط غير صحيح' };
      }
    },

    number(value) {
      if (isNaN(value)) {
        return { valid: false, message: 'هذا الحقل يجب أن يكون رقماً' };
      }
      return { valid: true };
    },

    positive(value) {
      if (parseFloat(value) <= 0) {
        return { valid: false, message: 'يجب أن يكون رقماً موجباً' };
      }
      return { valid: true };
    },

    date(value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { valid: false, message: 'التاريخ غير صحيح' };
      }
      return { valid: true };
    },

    age(value, minAge = 18) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < minAge) {
        return { valid: false, message: `العمر يجب أن يكون ${minAge} أو أكبر` };
      }
      return { valid: true };
    }
  },

  validateField(input, rules) {
    const value = input.value;
    const fieldName = input.getAttribute('data-label') || input.name || 'هذا الحقل';
    const errorElement = document.getElementById(`${input.id}-error`);

    let isValid = true;
    let errorMessage = '';

    for (const rule of rules) {
      const result = this.runValidator(rule, value, fieldName);
      if (!result.valid) {
        isValid = false;
        errorMessage = result.message;
        break;
      }
    }

    this.updateFieldUI(input, errorElement, isValid, errorMessage);
    return isValid;
  },

  runValidator(rule, value, fieldName) {
    const { type, params = [] } = rule;
    
    if (type === 'required') {
      return this.validators.required(value, fieldName);
    } else if (type === 'email') {
      return this.validators.email(value);
    } else if (type === 'phone') {
      return this.validators.phone(value);
    } else if (type === 'password') {
      return this.validators.password(value);
    } else if (type === 'url') {
      return this.validators.url(value);
    } else if (type === 'number') {
      return this.validators.number(value);
    } else if (type === 'positive') {
      return this.validators.positive(value);
    } else if (type === 'date') {
      return this.validators.date(value);
    } else if (type === 'minLength') {
      return this.validators.minLength(value, params[0], fieldName);
    } else if (type === 'maxLength') {
      return this.validators.maxLength(value, params[0], fieldName);
    } else if (type === 'confirm') {
      const compareInput = document.getElementById(params[0]);
      const compareValue = compareInput ? compareInput.value : '';
      return this.validators.confirm(value, compareValue, fieldName);
    } else if (type === 'age') {
      return this.validators.age(value, params[0]);
    } else if (type === 'custom' && rule.validator) {
      return rule.validator(value);
    }
    
    return { valid: true };
  },

  updateFieldUI(input, errorElement, isValid, errorMessage) {
    if (!isValid) {
      input.classList.add('border-red-500', 'focus:ring-red-500');
      input.classList.remove('border-green-500', 'focus:ring-green-500');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.remove('hidden');
      }
    } else {
      input.classList.remove('border-red-500', 'focus:ring-red-500');
      if (value !== '') {
        input.classList.add('border-green-500', 'focus:ring-green-500');
      }
      if (errorElement) {
        errorElement.classList.add('hidden');
      }
    }
  },

  validateForm(formId, options = {}) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const formData = {};

    form.querySelectorAll('[data-validate]').forEach(input => {
      const rules = this.parseValidationRules(input);
      const fieldValid = this.validateField(input, rules);
      
      if (!fieldValid) {
        isValid = false;
      }
      
      if (input.name) {
        formData[input.name] = input.value;
      }
    });

    if (isValid && options.onSuccess) {
      options.onSuccess(formData);
    } else if (!isValid && options.onError) {
      options.onError(formData);
    }

    return isValid;
  },

  parseValidationRules(input) {
    const rulesAttr = input.getAttribute('data-validate');
    if (!rulesAttr) return [];

    return rulesAttr.split('|').map(rule => {
      const [type, ...params] = rule.split(':');
      return {
        type,
        params: params.length > 0 ? params[0].split(',') : []
      };
    });
  },

  init(formId, options = {}) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.querySelectorAll('[data-validate]').forEach(input => {
      const rules = this.parseValidationRules(input);
      
      input.addEventListener('blur', () => {
        this.validateField(input, rules);
      });

      input.addEventListener('input', () => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement && !errorElement.classList.contains('hidden')) {
          this.validateField(input, rules);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const isValid = this.validateForm(formId, options);
      
      if (isValid && options.preventDefault !== false) {
        e.preventDefault();
      }
    });
  },

  reset(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.reset();
    form.querySelectorAll('[data-validate]').forEach(input => {
      const errorElement = document.getElementById(`${input.id}-error`);
      input.classList.remove('border-red-500', 'focus:ring-red-500', 'border-green-500', 'focus:ring-green-500');
      if (errorElement) {
        errorElement.classList.add('hidden');
      }
    });
  }
};
