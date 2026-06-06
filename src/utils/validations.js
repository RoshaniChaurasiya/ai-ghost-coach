export function validateLogin({ email, password }) {
  const errors = {};

  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function validateRegister(form) {
  const errors = {};

  const email = form.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.age || Number(form.age) < 5 || Number(form.age) > 100) {
    errors.age = 'Enter a valid age (5–100).';
  }

  if (!form.sport) {
    errors.sport = 'Choose your sport.';
  }

  if (!form.role) {
    errors.role = 'Choose a role for your sport.';
  }

  if (!form.level) {
    errors.level = 'Choose your experience level.';
  }

  if (!form.password || form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}