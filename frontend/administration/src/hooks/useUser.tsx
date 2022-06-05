export default function useUser() {
  const email = localStorage.getItem('email');
  const confirmed = localStorage.getItem('confirmed') === 'true';

  return { email, confirmed };
}
