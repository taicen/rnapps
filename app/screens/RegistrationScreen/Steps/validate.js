const validate = values => {
  const errors = {};

  if (!values.phone_number) {
    errors.phone_number = 'Обязательно поле';
  } else if (!/[0-9 -]{10}/.test(values.phone_number)) {
    errors.phone_number = 'Телефон должен состоять из 12 символов!';
  }

  return errors;
};

export const secondStepValidate = values => {
  const errors = {};

  if (!values.nonRezidentRK && !values.iin) {
    errors.iin = 'Обязательно поле';
  } else if (values.nonRezidentRK && !values.passport) {
    errors.passport = 'Обязательно поле';
  }

  if (!values.first_name) {
    errors.first_name = 'Обязательно поле';
  } else if (!/[а-я]+/gi.test(values.first_name)) {
    errors.first_name = 'Имя должно содержать только русские символы';
  }

  if (!values.last_name) {
    errors.last_name = 'Обязательно поле';
  } else if (!/[а-я]+/gi.test(values.last_name)) {
    errors.last_name = 'Фамилия должна содержать только русские символы';
  }

  if (!values.email) {
    errors.email = 'Обязательно поле';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
    errors.email = 'Неверный формат email';
  }

  if (!values.password) {
    errors.password = 'Обязательно поле';
  } else if (!/^(?=.*\d)[0-9a-zA-Z]{8,}$/.test(values.password)) {
    errors.password = 'Неверный формат пароля';
  }

  if (values.password) {
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Пароли не совпадают';
    }
  }

  ['policy1', 'policy2', 'policy3'].forEach(policy => {
    if (!values[policy]) {
      errors[policy] = 'Обязательно поле';
    }
  });
  return errors;
};

export const thirdStepValidate = values => {
  const errors = {};

  ['photo_2', 'photo_3'].forEach(field => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле';
    }
  });

  return errors;
};

export default validate;
