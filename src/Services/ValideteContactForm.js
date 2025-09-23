export const validateForm = (state) => {
  const errors = {};

  if (!state.name.trim()) {
    errors.name = "Name is required";
  }

  if (!state.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    errors.email = "Invalid email address";
  }

  if (!state.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(state.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};
