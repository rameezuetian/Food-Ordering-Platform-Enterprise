import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSave)}
      className="space-y-4 bg-gray-50 rounded-lg md:p-10"
    >
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          View and change your profile information here
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          {...form.register("email")}
          disabled
          className="bg-white"
          value={form.watch("email") ?? ""}
          onChange={form.register("email").onChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input {...form.register("name")} className="bg-white" />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Address Line 1</label>
          <Input {...form.register("addressLine1")} className="bg-white" />
          {form.formState.errors.addressLine1 && (
            <p className="text-sm text-red-500">
              {form.formState.errors.addressLine1.message}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">City</label>
          <Input {...form.register("city")} className="bg-white" />
          {form.formState.errors.city && (
            <p className="text-sm text-red-500">
              {form.formState.errors.city.message}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Input {...form.register("country")} className="bg-white" />
          {form.formState.errors.country && (
            <p className="text-sm text-red-500">
              {form.formState.errors.country.message}
            </p>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingButton />
      ) : (
        <Button type="submit" className="bg-orange-500">
          {buttonText}
        </Button>
      )}
    </form>
  );
};

export default UserProfileForm;