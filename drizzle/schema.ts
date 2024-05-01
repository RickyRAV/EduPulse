import { pgTable, foreignKey, pgEnum, uuid, varchar, text, smallint, timestamp, unique, jsonb, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const requestStatus = pgEnum("request_status", ['PENDING', 'SUCCESS', 'ERROR'])
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const appPermission = pgEnum("app_permission", ['courses.delete', 'assignments.delete', 'classes.delete', 'assignments_completions.update'])
export const appRole = pgEnum("app_role", ['admin', 'teacher', 'student'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const assignments = pgTable("assignments", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title").notNull(),
	description: text("description").notNull(),
	difficulty: smallint("difficulty").notNull(),
	maxHours: smallint("max_hours").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	courseId: uuid("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const rolePermissions = pgTable("role_permissions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	role: appRole("role").notNull(),
	permission: appPermission("permission").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const specializations = pgTable("specializations", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar("name").notNull(),
},
(table) => {
	return {
		specializationsNameKey: unique("specializations_name_key").on(table.name),
	}
});

export const students = pgTable("students", {
	userId: uuid("user_id").defaultRandom().primaryKey().notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		studentsUserIdKey: unique("students_user_id_key").on(table.userId),
	}
});

export const teachers = pgTable("teachers", {
	userId: uuid("user_id").primaryKey().notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		teachersUserIdKey: unique("teachers_user_id_key").on(table.userId),
	}
});

export const userRoles = pgTable("user_roles", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	role: appRole("role").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userRolesUserIdKey: unique("user_roles_user_id_key").on(table.userId),
		userRolesRoleKey: unique("user_roles_role_key").on(table.role),
	}
});

export const assignmentsCompletions = pgTable("assignments_completions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	difficultyReported: smallint("difficulty_reported").notNull(),
	timeSpent: smallint("time_spent").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	assignmentId: uuid("assignment_id").notNull().references(() => assignments.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	studentId: uuid("student_id").notNull().references(() => students.userId, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const classes = pgTable("classes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name").notNull(),
	year: varchar("year").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		classesNameKey: unique("classes_name_key").on(table.name),
	}
});

export const courses = pgTable("courses", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	classId: uuid("class_id").notNull().references(() => classes.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const users = pgTable("users", {
	id: uuid("id").default(sql`auth.uid()`).primaryKey().notNull(),
	name: jsonb("name").notNull(),
	email: varchar("email").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersEmailKey: unique("users_email_key").on(table.email),
	}
});

export const coursesTeachers = pgTable("courses_teachers", {
	coursesId: uuid("courses_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	teachersId: uuid("teachers_id").notNull().references(() => teachers.userId, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		coursesTeachersPkey: primaryKey({ columns: [table.coursesId, table.teachersId], name: "courses_teachers_pkey"})
	}
});

export const specializationsTeachers = pgTable("specializations_teachers", {
	specializationsId: uuid("specializations_id").notNull().references(() => specializations.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	teachersId: uuid("teachers_id").notNull().references(() => teachers.userId),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		specializationsTeachersPkey: primaryKey({ columns: [table.specializationsId, table.teachersId], name: "specializations_teachers_pkey"})
	}
});

export const studentsClasses = pgTable("students_classes", {
	studentsId: uuid("students_id").notNull().references(() => students.userId, { onDelete: "cascade", onUpdate: "cascade" } ),
	classesId: uuid("classes_id").notNull().references(() => classes.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		studentsClassesPkey: primaryKey({ columns: [table.studentsId, table.classesId], name: "students_classes_pkey"})
	}
});