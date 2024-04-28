import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import zod, { z } from "zod";
import FormInput from "../../common/inputs/FormField";
const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email field is required")
    .email("Not valid email"),
  password: zod.string().min(1, "Password field is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginSchema> = async (data, event) => {
    event?.preventDefault();
    console.log(data);
  };
  return (
    <Grid
      container
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      direction={"column"}
      gap={2}
      xs={12}
      md={4}
    >
      <FormInput
        label={"Email"}
        variant="outlined"
        fullWidth
        error={Boolean(errors.email)}
        errorMsg={errors.email}
        {...register("email")}
      />
      <FormInput
        label={"Password"}
        variant="outlined"
        fullWidth
        type="password"
        error={Boolean(errors.password)}
        errorMsg={errors.password}
        {...register("password")}
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </Grid>
  );
}
