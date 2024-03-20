import { z } from 'zod';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const phoneRegex = /^010\d{8}$/;

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: '이름은 2글자 이상이어야 합니다.' })
    .max(50, { message: '이름은 50글자 이하이어야 합니다.' }),
  email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
  phone: z
    .string()
    .min(11, { message: '연락처는 11자리어야 합니다.' })
    .max(11, { message: '연락처는 11자리어야 합니다.' })
    .refine((val) => phoneRegex.test(val), { message: '전화번호 앞자리는 010으로 시작해야합니다.' }),
  role: z.string().min(2, { message: '역할을 선택해주세요.' }),
  password: z
    .string()
    .min(6, { message: '비밀번호는 6자리 이상이어야 합니다.' })
    .refine((val) => passwordRegex.test(val), { message: '비밀번호는 특수문자, 숫자를 포함해야합니다.' }),
  confirmPassword: z
    .string()
    .min(6, { message: '비밀번호는 6자리 이상이어야 합니다.' })
    .refine((val) => passwordRegex.test(val), { message: '비밀번호는 특수문자, 숫자를 포함해야합니다.' }),
});
