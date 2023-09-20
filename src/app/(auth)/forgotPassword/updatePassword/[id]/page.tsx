import UpdatePasswordComponent from '@/components/auth/updatePassword';

interface UpdatePasswordProps {
  params: {
    id: string;
  };
}

export default function UpdatePasswordPage(params: UpdatePasswordProps) {
  return <UpdatePasswordComponent id={params.params.id} />;
}
