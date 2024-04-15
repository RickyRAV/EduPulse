import { pgTable, unique, pgEnum, uuid, timestamp, varchar, foreignKey, text, smallint, jsonb } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const appRole = pgEnum("app_role", ['admin', 'teacher', 'student'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const appPermission = pgEnum("app_permission", ['courses.delete', 'assignments.delete', 'classes.delete', 'assignments_completions.update'])


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

export const teachers = pgTable("teachers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
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

export const assignments = pgTable("assignments", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title").notNull(),
	description: text("description").notNull(),
	difficulty: smallint("difficulty").notNull(),
	maxHours: smallint("max_hours").notNull(),
	grade: smallint("grade").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	course: uuid("course").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const assignmentsCompletions = pgTable("assignments_completions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	difficultyReported: smallint("difficulty_reported").notNull(),
	timeSpent: smallint("time_spent").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	assignmentId: uuid("assignment_id").notNull().references(() => assignments.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const courses = pgTable("courses", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const students = pgTable("students", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").defaultRandom().notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	name: jsonb("name").notNull(),
	email: varchar("email"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersEmailKey: unique("users_email_key").on(table.email),
	}
});

export const classes = pgTable("classes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name").notNull(),
	year: varchar("year").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const specializationsTeachers = pgTable("specializations_teachers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	specializations: uuid("specializations").notNull().references(() => specializations.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	teachers: uuid("teachers").notNull().references(() => teachers.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const studentsClasses = pgTable("students_classes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	students: uuid("students").notNull().references(() => students.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	classes: uuid("classes").notNull().references(() => classes.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const rolePermissions = pgTable("role_permissions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	role: appRole("role").notNull(),
	permission: appPermission("permission").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const coursesTeachers = pgTable("courses_teachers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	courses: uuid("courses").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	teachers: uuid("teachers").notNull().references(() => teachers.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});