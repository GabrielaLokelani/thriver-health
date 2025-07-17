// Data migration only; remove when finished

import { 
  // signIn
 } from "aws-amplify/auth";
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import Papa from 'papaparse'

import { Feedback, Group, Location, Organization, Pillar, User, UserActivity, UserType } from '../src/types'
import { Feedback_Old, Group_Old, Location_Old, Organization_Old, Pillar_Old, User_Old, UserActivity_Old } from './oldTypes'

export class Migrater {
	private client = generateClient<Schema>();

	// ##### HELPERS ##### //

	private formatActivityStatus(status: string): "accepted" | "submitted" | "rejected" | "archive" | undefined {
		switch (status) {
			case ("Accepted"): 
				return "accepted"
			case ("Submitted"): 
				return "submitted"
			case ("Rejected"): 
				return "rejected"
			case ("Deleted"): 
				return "archive"
			default:
				return undefined;
		}
	}

	private formatUserType(status: string): UserType | undefined {
		switch (status) {
			case ("3"): 
				return "participant"
			case ("8"): 
				return "ssa"
			case ("1"): 
				return "admin"
			default:
				return undefined;
		}
	}
		
	private formatDate(dateString: string | undefined): string | undefined {
	if (!dateString) return undefined;

	// If it's already in yyyy-mm-dd format, return as-is
	if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
		return dateString;
	}

	// If it's a long numeric string, assume it's a UNIX timestamp in ms
	if (/^\d{10,}$/.test(dateString)) {
		const millis = parseInt(dateString, 10);
		return new Date(millis).toISOString().substring(0, 10);
	}

	// Otherwise try to parse it as a date string
	const date = new Date(dateString);
	if (!isNaN(date.getTime())) {
		return date.toISOString().substring(0, 10);
	}

	throw new Error(`Invalid date format: "${dateString}"`);
	}

	private sanitizePrefix(prefix: string): string {
		return prefix.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10) || 'id';
	}

	private formatId(id: unknown): string {
		if (id && this.isValidId(id)) {
			return id as string;
		} else {
			const prefix = typeof id === 'string' ? this.sanitizePrefix(id) : 'id';
			return this.generatePaddedUuid(prefix);
		}
	}

	private isValidId(id: unknown): boolean {
		if (typeof id !== 'string') return false;
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(id);
	}

	// private generatePrefixedId(prefix?: string): string {
	// 	if (prefix) {
	// 		const sanitized = prefix.replace(/[^a-zA-Z0-9]/g, ''); // remove unsafe chars
	// 		const randomSuffix = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
	// 			const r = Math.random() * 16 | 0;
	// 			const v = c === 'x' ? r : (r & 0x3 | 0x8);
	// 			return v.toString(16);
	// 		});
	// 		return sanitized + randomSuffix.slice(sanitized.length);
	// 	}
	// 	else {
	// 		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
	// 			const random = Math.random() * 16 | 0;
	// 			const value = char === 'x' ? random : (random & 0x3 | 0x8);
	// 			return value.toString(16);
	// 		});
	// 	}
	// }
	
	private async parseCSVFile<T>(file: string): Promise<T[]> {
		return new Promise<T[]>((resolve, reject) => {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					if (results.errors.length > 0) {
						reject(new Error(`CSV Parse error: ${results.errors[0].message}`));
					} else {
						resolve(results.data as T[]);
					}
				},
				error: (error: any) => {
					reject(new Error(`Parsing failed: ${error.message}`));
				},
			});
		});
	}
	
	private generatePaddedUuid(s: string): string {
		// Strip non-alphanumeric just in case (optional)
		const clean = s.replace(/[^a-zA-Z0-9]/g, "");

		// Pad with zeros to reach 32 characters
		const full = (clean + "0".repeat(32)).slice(0, 32);

		// Format as UUID
		return `${full.slice(0, 8)}-${full.slice(8, 12)}-${full.slice(12, 16)}-${full.slice(16, 20)}-${full.slice(20)}`;
	}

	private getGradingSystem(id: number): string | undefined {
		switch (id) {
			case (1):
				return 'GPA'
			case (2):
				return 'hours'
			case (4):
				return 'doc_points'
		}
	}

	// private getPillarColor(name: string) {}

	private getPillarName(id: string): string {
		switch (id) {
			case ('7027dbe0-189c-451d-81cb-b6964116e77c'):
				return 'Academics'
			case ('545d9bc3-4479-46fa-b242-de08a7ebd920'):
				return 'Extracurricular Activities'
			case ('a4debeb0-3ad4-482f-9d0f-09b36d46e645'):
				return 'Head of State Award Scheme (DofE)'
			case ('68d4e275-1abb-42b7-9660-067332ecac37'):
				return 'References & Exit Essay'

			case ('e9ea78a6-2143-4edf-83b8-c2ebbb3919cc'):
				return 'Academics'
			case ('8108f485-11ee-4397-bec8-efb7ebd87f52'):
				return 'Extracurricular Activities'

			case ('10961307-5fe4-4614-9a6c-ba6b21934d9f'):
				return 'Social and Non-Formal'
			case ('58352726-36d9-417a-b9df-dd2d4b94b51c'):
				return 'References & Essays'
			case ('9dcdb105-38f8-47cd-8d47-039389b8aa21'):
				return 'Extracurricular Activites'
			case ('4365c32d-90b8-4269-8419-57319339f883'):
				return 'Spiritual Empowerment'

			case ('383a48ed-f185-4791-a5fd-67b8e849d2e4'):
				return 'Life Skills'
			case ('e28406f0-f907-4c33-9c93-af2dbe8705ca'):
				return 'Social and Non-Formal'
			case ('f2e9a32d-2690-4203-80a6-abfac3d16777'):
				return 'References & Essays'
			case ('9bea11fc-4303-4e7e-9ea1-4ec61b76f536'):
				return 'Community Connection'

			case ('31bb0e33-1c53-4044-aa61-e635e3fea648'):
				return 'DEMO'
			case ('54acce84-92e1-400a-89bd-7a74a1dfd80d'):
				return 'References & essays'
			case ('1f82347d-0ea6-4496-958c-2aa5e8604f20'):
				return 'Academics'
			case ('cafe5850-3e06-41ef-a3b6-e1a82c4eb17a'):
				return 'Extracurricular Activities'
			case ('de8dfe8e-da73-4c85-91a1-8dee7e304ab1'):
				return 'Social and Non-Formal (jkl)'
			case ('686875dc-b456-4d20-9d42-9668819e060f'):
				return 'Academics'
			case ('b6ed8fc3-ee34-437a-8e1f-c6cfe11d7492'):
				return 'Extracurricular Activities'
			case ('479e824b-31a0-49c0-b770-2b218c03e7e1'):
				return 'Social & Non-Formal (Keystone)'
			case ('83fee40d-f660-48c5-a22f-9794bf229a23'):
				return 'References & Essays'
			case ('a689c424-1c8b-4968-adce-f59ad77f80fd'):
				return 'Academics'
			case ('2219688e-5782-4c80-ba1b-7f4c8de8e249'):
				return 'References & Exit Essay'
			default:
				return 'Unknown pillar'
		}
	}

	// private getProgramPillarId(organizationPillarId: string): string {
	// 	switch (organizationPillarId) {
	// 		case ('7027dbe0-189c-451d-81cb-b6964116e77c'):

	// 			return 'Academics'
	// 		case ('545d9bc3-4479-46fa-b242-de08a7ebd920'):
	// 			return 'Extracurricular Activities'
	// 		case ('a4debeb0-3ad4-482f-9d0f-09b36d46e645'):
	// 			return 'Head of State Award Scheme (DofE)'
	// 		case ('68d4e275-1abb-42b7-9660-067332ecac37'):
	// 			return 'References & Exit Essay'

	// 		case ('e9ea78a6-2143-4edf-83b8-c2ebbb3919cc'):
	// 			return 'Academics'
	// 		case ('8108f485-11ee-4397-bec8-efb7ebd87f52'):
	// 			return 'Extracurricular Activities'

	// 		case ('10961307-5fe4-4614-9a6c-ba6b21934d9f'):
	// 			return 'Social and Non-Formal'
	// 		case ('58352726-36d9-417a-b9df-dd2d4b94b51c'):
	// 			return 'References & Essays'
	// 		case ('9dcdb105-38f8-47cd-8d47-039389b8aa21'):
	// 			return 'Extracurricular Activites'
	// 		case ('4365c32d-90b8-4269-8419-57319339f883'):
	// 			return 'Spiritual Empowerment'

	// 		case ('383a48ed-f185-4791-a5fd-67b8e849d2e4'):
	// 			return 'Life Skills'
	// 		case ('e28406f0-f907-4c33-9c93-af2dbe8705ca'):
	// 			return 'Social and Non-Formal'
	// 		case ('f2e9a32d-2690-4203-80a6-abfac3d16777'):
	// 			return 'References & Essays'
	// 		case ('9bea11fc-4303-4e7e-9ea1-4ec61b76f536'):
	// 			return 'Community Connection'

	// 		case ('31bb0e33-1c53-4044-aa61-e635e3fea648'):
	// 			return 'DEMO'
	// 		case ('54acce84-92e1-400a-89bd-7a74a1dfd80d'):
	// 			return 'References & essays'
	// 		case ('1f82347d-0ea6-4496-958c-2aa5e8604f20'):
	// 			return 'Academics'
	// 		case ('cafe5850-3e06-41ef-a3b6-e1a82c4eb17a'):
	// 			return 'Extracurricular Activities'
	// 		case ('de8dfe8e-da73-4c85-91a1-8dee7e304ab1'):
	// 			return 'Social and Non-Formal (jkl)'
	// 		case ('686875dc-b456-4d20-9d42-9668819e060f'):
	// 			return 'Academics'
	// 		case ('b6ed8fc3-ee34-437a-8e1f-c6cfe11d7492'):
	// 			return 'Extracurricular Activities'
	// 		case ('479e824b-31a0-49c0-b770-2b218c03e7e1'):
	// 			return 'Social & Non-Formal (Keystone)'
	// 		case ('83fee40d-f660-48c5-a22f-9794bf229a23'):
	// 			return 'References & Essays'
	// 		case ('a689c424-1c8b-4968-adce-f59ad77f80fd'):
	// 			return 'Academics'
	// 		case ('2219688e-5782-4c80-ba1b-7f4c8de8e249'):
	// 			return 'References & Exit Essay'
	// 		default:
	// 			return 'Unknown pillar'
	// 	}
	// }

	// ##### UPLOAD FUNCTIONS ##### //

	// ##### UPLOAD FUNCTIONS ##### //

	async uploadUserCOTW() {
		const csvText = await fetch('/data-migration/csv_files/users_cotw.csv').then(res => res.text());
		const rows = await this.parseCSVFile<any>(csvText);

		for (const row of rows) {
			const id = row.student_id?.trim();
			if (!id) continue; // skip if no user ID

			console.log(row);

			const updateFields = {
				id: row.student_id,
				logicalScore: parseInt(row.i_logical || '0', 10),
				linguisticScore: parseInt(row.i_linguistic || '0', 10),
				spatialScore: parseInt(row.i_spatial || '0', 10),
				kinestheticScore: parseInt(row.i_kinesthetic || '0', 10),
				musicalScore: parseInt(row.i_musical || '0', 10),
				naturalisticScore: parseInt(row.i_naturalistic || '0', 10),
				interpersonalScore: parseInt(row.i_interpersonal || '0', 10),
				intrapersonalScore: parseInt(row.i_intrapersonal || '0', 10),
				existentialScore: parseInt(row.i_existential || '0', 10),
			};

			console.log(updateFields);

			try {
				const result = await this.client.models.User.update(updateFields);
				console.log(result);
			} catch (err) {
				console.error(`❌ Failed to update ${id}:`, err);
			}
		}
	}

	async uploadStudentSettings() {
		const csvText = await fetch('/data-migration/csv_files/settings_student.csv').then(res => res.text());
		// console.log(csvText);
		const rows = await this.parseCSVFile<any>(csvText);

		let i = 0;
		for (const row of rows) {
			i++;
			console.log(row);
			const update = {
				id: row.student_id,
				logical: row.administer_logical === "1",
				linguistic: row.administer_linguistic === "1",
				spatial: row.administer_spatial === "1",
				kinestethic: row.administer_kinesthetic === "1", // intentional spelling from schema
				musical: row.administer_musical === "1",
				naturalistic: row.administer_naturalistic === "1",
				interpersonal: row.administer_interpersonal === "1",
				intrapersonal: row.administer_intrapersonal === "1",
				existential: row.administer_existential === "1",

				logicalDifficulty: row.difficulty_logical || undefined,
				linguisticDifficulty: row.difficulty_linguistic || undefined,
				spatialDifficulty: row.difficulty_spatial || undefined,
				kinestheticDifficulty: row.difficulty_kinesthetic || undefined,
				musicalDifficulty: row.difficulty_musical || undefined,
				naturalisticDifficulty: row.difficulty_naturalistic || undefined,
				interpersonalDifficulty: row.difficulty_interpersonal || undefined,
				intrapersonalDifficulty: row.difficulty_intrapersonal || undefined,
				existentialDifficulty: row.difficulty_existential || undefined,
			};
			console.log(update);

			try {
				const result = await this.client.models.User.update(update);
				console.log(result);
			} catch (err) {
				console.error(`❌ Failed to update ${row.student_id}:`, err);
			}
		}
	}

	public async uploadUsers() {
		const csv = await fetch('/data-migration/csv_files/users.csv').then((res) => res.text());
		console.log(csv);

		const data: User_Old[] = await this.parseCSVFile<User_Old>(csv);

		console.log(data);

		let i = 0;
		for (const row of data) {
			console.log(row);
			// if (i > 0) break;
			i++;
			const newUser: User = {
				id: row.id,
				organizationId: this.formatId(row.organization_id),
				status: "active", // all users in the live Xano database are active
				userType: this.formatUserType(row.osusertype_id),
				locations: [row.school_id],
				groups: [this.generatePaddedUuid(row.academicprogram_id)],
				talentLmsId: row.user_idTalentlms,
				hesId: row.studentId, // is this HeS?
				// journals: [],
				// userActivities: [],
				// userActivityLogs: [],
				entryDate: this.formatDate(row.created_at),
				exitDate: "2025-06-30",
				receivedScholarship: row.OsuserType === '3' ? false : null,
				// scholarshipAmount: 5000,
				// consentForm: "https://example.com/consent.pdf", // TODO very important
			};

			console.log('newUser:', newUser)
			i++;
			this.client.models.User.create(newUser)
		}
	}

	public async uploadUserActivities() {
		const activitiesCsv = await fetch('/data-migration/csv_files/user_activities.csv').then((res) => res.text());
		// console.log(csv)
		const activities: UserActivity_Old[] = await this.parseCSVFile(activitiesCsv);

		const pillarsCsv = await fetch('/data-migration/csv_files/program_pillars.csv').then((res) => res.text());
		const pillars: Pillar_Old[] = await this.parseCSVFile(pillarsCsv);

		let i = 0;
		for (const activity of activities) {
			// if (i > 0) break;
			// if (activity.user_id !== "f623348f-0bc0-40c0-b069-437abb85ac3b") continue;
			i++;

			const pillar = pillars.find(
				pillar => pillar.organizationpillar_id === activity.organizationpillar_id && 
				pillar.period === activity.period &&
				pillar.academicprogram_id === activity.academicprogram_id
			)
			if (!pillar?.id) {
				console.log("NOT FOUND", activity.organizationpillar_id, activity.period, activity.id, activity.user_id)
				continue;
			}
			const out: UserActivity = {
				id: this.generatePaddedUuid(activity.id),
				userId: activity.user_id,
				pillarId: pillar.id,
				status: this.formatActivityStatus(activity.status ?? ''),
				period: parseInt(String(activity.period)) ?? null,
				points: parseFloat(String(activity.points)) ?? null,
				grade: parseFloat(String(activity.grade)) ?? null,
				hours: parseFloat(String(activity.hoursSpent)) ?? null,
				description: activity.description,
				title: activity.title,
				// files: null, // todo
				approvedPoints: parseFloat(String(activity.approvedPoints)) ?? null, // The points an SSA decides to give the activity
				dateCreated: this.formatDate(activity.created_at),
				datePerformed: this.formatDate(activity.datePerformed),
				dateSubmitted: this.formatDate(activity.activitySubmittied),
				dateApproved: this.formatDate(activity.activitiyApproved)
			}
			const bar = await this.client.models.UserActivity.create(out)
			if (bar?.errors) {
				console.log(bar);
				console.log('ERROR')
			}
			else console.log('foo');
		}

		console.log("DONE");
	}
	
	async uploadPillars() {
		const pillarsCsv = await fetch('/data-migration/csv_files/program_pillars.csv').then((res) => res.text());
		console.log(pillarsCsv);
		const pillarsData: Pillar_Old[] = await this.parseCSVFile(pillarsCsv);
		console.log(pillarsData)

		let i = 0;
		for (const row of pillarsData) {
			// if (i > 0) break;
			i++;
			console.log(row)
			if (!row.academicprogram_id || !row.organizationpillar_id) continue;
			const out: Pillar = {
				id: row.id,
				name: this.getPillarName(row.organizationpillar_id), 
				duration: Number(row.period),
				groupId: this.generatePaddedUuid(String(row.academicprogram_id)),
				status: 'active',
				period: Number(row.period),
				maxPoints: Number(row.weight),
				year: Number(row.year),
				exchangeRate: Number(row.exchangeRate),
				gradingSystem: this.getGradingSystem(row.osgradingsystem_id ?? 0),
				maxHours: Number(row.totalhours),
				maxGPA: Number(row.GPA),
				pointsLettersReferences: Number(row.pointsLetterReference),
				pointsEssays: Number(row.pointsEssays),
				startDate: this.formatDate(row.startDate),
				endDate: this.formatDate(row.endDate),
			}
			console.log(out)
			break;
			// const bar = await this.client.models.Pillar.create(out)
			// console.log(bar)
		}
	}

	async uploadOrganizations() {
		const csv = await fetch('/data-migration/csv_files/organizations.csv').then((res) => res.text());
		console.log(csv);
		const data: Organization_Old[] = await this.parseCSVFile(csv);

		let i = 0
		for (const row of data) {
			// if (i > 0) break;
			i++;
			// console.log(row.user_id)
			const out: Organization = {
				id: row.id,
				name: row.name,
				// logo?: string; // a.url()
				mainColor: row.mainColor,
				secondaryColor: row.secondaryColor,
				tertiaryColor: row.tertiaryColor,
				quaternaryColor: row.quaternaryColor,
				gradingSystem: 'GPA',
				startDate: this.formatDate(String(row.created_at)),
				address: row.Address,
				acronym: row.acronym,
				// legalFiles?: string[]; // Array of URLs
				// groups?: Group[]; // Relationship (optional unless eagerly loaded)
				// locations?: Location[]; // Relationship (optional)
			}
			console.log(out)
			const bar = await this.client.models.Organization.create(out)
			console.log(bar)
		}
	}

	async uploadLocations() {
		const csv = await fetch('/data-migration/csv_files/locations.csv').then((res) => res.text());
		console.log(csv);
		const data: Location_Old[] = await this.parseCSVFile(csv); 

		let i = 0
		for (const row of data) {
			// if (i > 0) break;
			i++;
			// console.log(row.user_id)
			const out: Location = {
				id: row.id,
				name: row.name,
				address: row.loacation,
				organizationId: row.organization_id,
				// organization?: Organization
				dateCreated: this.formatDate(String(row.created_at)),
				// groupLocations?: any[]; // Assume defined elsewhere
			}
			console.log(out)
			const bar = await this.client.models.Location.create(out)
			console.log(bar)
		}
	}

	async uploadGroups() {
		const csv = await fetch('/data-migration/csv_files/groups.csv').then((res) => res.text());
		console.log(csv);
		const data: Group_Old[] = await this.parseCSVFile(csv); 

		let i = 0
		for (const row of data) {
			// if (i > 0) break;
			i++;
			// console.log(row.user_id)
			const out: Group = {
				id: this.generatePaddedUuid(String(row.id)),
				name: row.name,
				duration: row.duration,
				objective: row.objective,
				startYear: Number(this.formatDate(String(row.created_at))?.substring(0, 4)),
				endYear: Number(this.formatDate(String(row.created_at))?.substring(0, 4)) + row.duration,
				organizationId: row.organization_id,
				// organization?: ,
				status: "active",
				// locationIds?: string[];
				// groupLocations?: any[]; // Assume this is defined elsewhere
				periodType: row.periodicity ? row.periodicity.toLowerCase() : undefined, // "year", "semester", etc.
				// awards?: any[]; // todo
				// pillars?: Pillar[]; // Assume defined elsewhere
				// events?: Event[]; // Assume defined elsewhere
				// numIndividualChallenges?: number;
				// numGroupChallenges?: number;
				difficultyPromotion: "algorithm"
			}
			console.log(out)
			const bar = await this.client.models.Group.create(out)
			console.log(bar)
		}
	}

	public async uploadFeedback() {
		const csv = await fetch('/data-migration/csv_files/feedback.csv').then((res) => res.text());
		console.log('csv:', csv);
		const data: Feedback_Old[] = await this.parseCSVFile(csv);
		console.log(data);

		const createPromises = data.map((feedback) => 
			this.client.models.Feedback.create({
				id: this.generatePaddedUuid(String(feedback.id)),
				userId: feedback.user_id,
				feedback: feedback.feedback,
				userActivityId: this.generatePaddedUuid(String(feedback.useractivity_id)),
				date: this.formatDate(feedback.date),
				resolved: feedback.resolved,
				createdAt: this.formatDate(String(feedback.created_at))
				// file: string
			})
		);

		await Promise.all(createPromises);

		console.log(`Updated ${createPromises.length} items.`);

		// for (const row of data) {
		// 	// if (i > 0) break;
		// 	i++;
		// 	// console.log(row.user_id)
		// 	const out: Feedback = {
		// 		id: this.stringToUuidPadded(String(row.id)),
		// 		userId: row.user_id,
		// 		feedback: row.feedback,
		// 		userActivityId: this.stringToUuidPadded(String(row.useractivity_id)),
		// 		date: this.formatDate(row.date),
		// 		resolved: row.resolved,
		// 		createdAt: this.formatDate(String(row.created_at))
		// 		// file: string
		// 	}
		// 	console.log(out)
		// 	const bar = await this.client.models.Feedback.create(out)
		// 	console.log(bar)
		// }
	}

	// ##### UPDATE FUNCTIONS ##### //

	public async correctUserActivities() {
		const csv = await fetch('/data-migration/csv_files/user_activities.csv').then((res) => res.text());
		console.log(csv)
		const oldActivities: UserActivity_Old[] = await this.parseCSVFile(csv);
		let activities: any[] = []
		let oldToken: string | undefined = undefined;
		do {
			// @ts-ignore
			const { data, errors, nextToken: token } = await this.client.models.UserActivity.list({
				nextToken: oldToken
			})

			if (errors) {
				console.error(errors);
			}
			
			if (data) {
				activities = [...activities, ...data];
			}

			oldToken = token;
		} while (oldToken);

		console.log(oldActivities)
		console.log(activities)
		for (const row of activities) {
			this.client.models.UserActivity.update({
				id: row.id,
				status: this.formatActivityStatus(row.status)
			})
		}
	}

	async updatePillarColors() {
		// Step 1: Query all Foo items where biz === "bum"
		let oldToken: string | undefined = undefined;
		let pillars: any[] = []
		do {
			// @ts-ignore
			const { data, errors, nextToken } = await this.client.models.Pillar.list({ 
				nextToken: oldToken,
				filter: {
					// color: {
					// 	eq: ''
					// }
					groupId: {
						eq: '12300000-0000-0000-0000-000000000000'
					}
				}
			})
		
			if (errors) {
				console.error(errors);
			}

			if (data) {
				pillars = [...pillars, ...data]
			}
			oldToken = nextToken;
		} while (oldToken);

		console.log(pillars)
		pillars.forEach((pillar) => console.log(pillar.name))

		// const updatePromises = pillars.map((pillar) => 
		// 	this.client.models.Pillar.delete({id: pillar.id})
		// );

		// await Promise.all(updatePromises);

		// console.log(`Updated ${updatePromises.length} items.`);
	}
	
	public async updateFeedback() {
		let allFeedbacks: Feedback[] = []
		let nextToken
		do {
			// @ts-ignore
			const { data, nextToken: newToken, errors } = await this.client.models.Feedback.list({
				limit: 100, // adjust based on your throughput
				nextToken,
			});
		} while (nextToken);

		console.log(allFeedbacks)

		// const updatePromises = allFeedbacks.map(async (feedback) => {
		// if (!feedback.userActivity && feedback.userActivityId) {
		// 	const userActivity = await this.client.models.UserActivity.get({ id: feedback.userActivityId });

		// 	if (userActivity) {
		// 	return this.client.models.Feedback.update({
		// 		...feedback,
		// 		userActivity,
		// 	});
		// 	}
		// }
		// });

		// await Promise.all(updatePromises);
	}

	// ##### DELETE FUNCTIONS ##### //

	async deleteAllUserActivities() {
		let nextToken: string | undefined = undefined;


		do {
			// @ts-ignore
			const { data, nextToken: newToken, errors } = await this.client.models.UserActivity.list({
				limit: 100, // adjust based on your throughput
				nextToken,
			});

			if (errors) {
				console.error("List error:", errors);
				break;
			}

			if (data) {
				const deletePromises = data.map((activity) => 
					this.client.models.UserActivity.delete({id: activity.id})
				)

				Promise.all(deletePromises);
				console.log(deletePromises.length);
			}


			nextToken = newToken;
		} while (nextToken);

		console.log("DONE")
	}

	async deleteAllPillars() {
		let nextToken: string | undefined = undefined;

		do {
			// @ts-ignore
			const { data, nextToken: newToken, errors } = await this.client.models.Pillar.list({
				limit: 100, // adjust based on your throughput
				nextToken,
			});

			if (errors) {
				console.error("List error:", errors);
				break;
			}

			if (data) {
				// const deletePromises = data.map((pillar) => 
				// 	this.client.models.Pillar.delete({id: pillar.id})
				// )

				// Promise.all(deletePromises);
				// console.log(deletePromises.length);
			}


			nextToken = newToken;
		} while (nextToken);

		console.log("DONE")
	}
	
	async deleteAllFeedback() {
		let nextToken: string | undefined = undefined;

		do {
			// @ts-ignore
			const { data, nextToken: newToken, errors } = await this.client.models.Feedback.list({
				limit: 100, // adjust based on your throughput
				nextToken,
			});

			if (errors) {
				console.error("List error:", errors);
				break;
			}

			
			const deletePromises = data.map((feedback) => 
				this.client.models.Feedback.delete({id: feedback.id})
			);

			await Promise.all(deletePromises);

			console.log(`Updated ${deletePromises.length} items.`);

			nextToken = newToken;
		} while (nextToken);
	}

	// ##### LIST FUNCTIONS ###### //

	public async listUsers() {
	}

	public async listUserActivities() {

		// const csv = await fetch('/data-migration/csv_files/user_activities.csv').then((res) => res.text());
		// const data: UserActivity_Old[] = await this.parseCSVFile(csv);
		// console.log(data);
		
		let allActivities: UserActivity[] = [];
		let nextToken: string | undefined = undefined;

		do {
		// @ts-ignore
			const { data, nextToken: newToken, errors } = await this.client.models.UserActivity.list({
				filter: {
					userId: {
						eq: 'f623348f-0bc0-40c0-b069-437abb85ac3b'
					}
				},
				limit: 100,
				nextToken,
			});

			if (errors) {
				console.error("List error:", errors);
				break;
			}


			// if (data) {
			// 	allActivities.push(...data); // accumulate results
			// }

			nextToken = newToken; // update for next iteration
		} while (nextToken);
		console.log(allActivities)

		const newTotalPoints = allActivities.reduce((sum, activity) => {
			return activity.status === 'accepted' ? sum + (activity.approvedPoints ?? 0) : 0;
		}, 0);
		console.log(newTotalPoints)

		console.log("DONE", allActivities.length, "activities fetched");
	}

	public async listPillars() {
		let allPillars: Pillar[] = [];
		let nextToken: string | undefined = undefined;

		do {
			// @ts-ignore
			const { data, nextToken: newToken, errors } = await this.client.models.Pillar.list({
				limit: 100,
				nextToken,
			});

			if (errors) {
				console.error("List error:", errors);
				break;
			}


			// if (data) {
			// 	allPillars.push(...data); // accumulate results
			// }

			nextToken = newToken; // update for next iteration
		} while (nextToken);
		console.log(allPillars)

		console.log("DONE", allPillars.length, "activities fetched");
	}
}

export default Migrater;