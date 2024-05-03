import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import zod, { z } from "zod";
import FormInput from "../../nav/common/inputs/FormField";
import { useRegisterMutation } from "../../../common/hooks/auth";

const registerSchema = zod
  .object({
    email: zod
      .string()
      .min(1, "Email field is required")
      .email("Not valid email"),
    password: zod.string().min(1, "Password field is required"),
    confirmPassword: zod.string().min(1, "Confirm password field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;
export default function RegisterForm() {
  const registerMutation = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterInput> = async (data, event) => {
    event?.preventDefault();
    registerMutation.mutate(data);
    alert("R");
  };
  return (
    <Grid
      container
      component={"form"}
      direction={"column"}
      onSubmit={handleSubmit(onSubmit)}
      gap={2}
    >
      <FormInput
        label={"Email"}
        error={Boolean(errors.email)}
        variant="outlined"
        fullWidth
        fielderror={errors.email}
        {...register("email")}
      />
      <FormInput
        label={"Password"}
        error={Boolean(errors.password)}
        variant="outlined"
        fielderror={errors.password}
        fullWidth
        {...register("password")}
      />
      <FormInput
        label={"Confirm Password"}
        error={Boolean(errors.confirmPassword)}
        variant="outlined"
        fielderror={errors.confirmPassword}
        {...register("confirmPassword")}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </Grid>
  );
}
