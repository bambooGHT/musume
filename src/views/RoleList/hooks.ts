import { role } from '@/store';
import { useRouter, useRoute } from 'vue-router';
const hooks = () => {
  const route = useRoute();
  const router = useRouter();
  const Role = role();

  const topath = (id: number) => {
    router.push({
      path: `/character/${id}`
    });
  };
  return {
    route,
    Role,
    topath
  };
};
export default hooks;