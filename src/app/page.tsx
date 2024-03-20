'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const phoneRegex = /^010\d{8}$/;

const formSchema = z.object({
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

import React from 'react';

const LoginForm = () => {
  const [pageNum, setPageNum] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confirmPassword: '',
    },
  });

  const nextStep = async () => {
    await form.trigger(['username', 'email', 'phone', 'role']);

    const usernameState = form.getFieldState('username');
    const emailState = form.getFieldState('email');
    const phoneState = form.getFieldState('phone');
    const roleState = form.getFieldState('role');

    if (!usernameState.isDirty || usernameState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;
    if (!phoneState.isDirty || phoneState.invalid) return;
    if (!roleState.isDirty || roleState.invalid) return;

    setPageNum(1);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: '비밀번호가 일치하지 않습니다.',
      });
      return false;
    }

    console.log(values);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
              <motion.div
                className={cn('space-y-3')}
                animate={{ translateX: `${pageNum * -100}%` }}
                transition={{ ease: 'easeInOut' }}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@sparta-devcamp.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="01000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>역할</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="역할을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="관리자">관리자</SelectItem>
                          <SelectItem value="일반사용자">일반사용자</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn('space-y-3 absolute top-0 left-0 right-0')}
                animate={{ translateX: `${(1 - pageNum) * 100}%` }}
                style={{ translateX: `${(1 - pageNum) * 100}%` }}
                transition={{
                  ease: 'easeInOut',
                }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <Button type="button" className={cn({ hidden: pageNum === 1 })} onClick={nextStep}>
                다음 단계로
                <FaArrowRight />
              </Button>
              <div className="flex gap-3">
                <Button type="submit" className={cn({ hidden: pageNum === 0 })}>
                  계정 생성하기
                </Button>
                <Button
                  variant="ghost"
                  className={cn({ hidden: pageNum === 0 })}
                  type="button"
                  onClick={() => setPageNum(0)}
                >
                  뒤로 가기
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
