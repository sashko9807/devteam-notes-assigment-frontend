import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import zod, { z } from "zod";
import FormInput from "../../nav/common/inputs/FormField";
import { useLoginMutation } from "../../../common/hooks/auth";
import { useRouter } from "@tanstack/react-router";
import { routes } from "../../../common/routes";
const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email field is required")
    .email("Not valid email"),
  password: zod.string().min(1, "Password field is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInput> = async (data, event) => {
    event?.preventDefault();
    const result = await loginMutation.mutateAsync(data);

    if (result.status === 200) {
      router.navigate({ to: routes.dashboard.index });
    }
  };
  return (
    <Grid
      container
      item
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      direction={"column"}
      gap={2}
    >
      <FormInput
        label={"Email"}
        variant="outlined"
        fullWidth
        error={Boolean(errors.email)}
        fielderror={errors.email}
        {...register("email")}
      />
      <FormInput
        label={"Password"}
        variant="outlined"
        fullWidth
        type="password"
        error={Boolean(errors.password)}
        fielderror={errors.password}
        {...register("password")}
      />
      <Grid item>
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
