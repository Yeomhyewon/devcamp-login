import { Control, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

interface FormComponentsType {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  inputType?: string;
}

const FormComponents = ({ control, label, name, placeholder, inputType }: FormComponentsType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={inputType} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormComponents;
