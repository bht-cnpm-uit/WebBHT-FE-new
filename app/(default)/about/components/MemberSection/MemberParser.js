/**
 * @typedef {Semester} Semester
 * @property {number} index: index of semester (1 or 2)
 * @property {number} start_year: start year of semester (two last digits)
 * @property {number} end_year: end year of semester (two last digits)
 */

/**
 * @typedef {RoleRecord} RoleRecord
 * @property {string} role
 * @property {Semester} start_semester
 * @property {Semester} end_semester
 */

/**
 * @typedef {Member} Member
 * @property {string} name
 * @property {number} school_year
 * @property {RoleRecord[]} role_history
 * @property {string} image
 *
 * @property {string} current_role_title
 * @property {number} current_role_index
 * @property {string[]} role_titles
 */

const roleTitleMap = {
    'T': 'Trưởng Ban',
    'P': 'Phó Ban',
    'LHT': 'Lead Học Thuật',
    'LTT': 'Leader Truyền Thông',
    'LTA': 'Leader Tiếng Anh',
    'LC': 'Leader Content',
    'PHT': 'Phó Lead Học Thuật',
    'CVHT': 'Cố Vấn Học Thuật',
    'M': 'Thành Viên',
};

import {getImageFromProperty} from "~/utils/notionTool";

/**
 * examples semesters: 1-22-23, 2-21-22, 1-21-22
 */
const SEMESTER_REGEX = /([12])-(\d{2})-(\d{2})/;
const ROLE_RECORD_REGEX = /(\w+):([12])-(\d{2})-(\d{2})(?::([12])-(\d{2})-(\d{2}))?/;

/**
 *
 * @param raw: raw string of semester (<index>-<start_year>-<end_year>)
 * @return {Semester} semester
 */
function toSemester(raw) {
    const match = raw.match(SEMESTER_REGEX);
    return {
        index: +match[1],
        start_year: +match[2],
        end_year: +match[3],
    };
}

/**
 *
 * @param raw: raw string of record (<role_id>:<start_semester>[:<end_semester>])
 * @return {RoleRecord} record
 *
 */
function toRoleRecord(raw) {
    const match = raw.match(ROLE_RECORD_REGEX);
    return {
        role: match[1],
        start_semester: toSemester(match[2] + '-' + match[3] + '-' + match[4]),
        end_semester: match.length > 4 && match[5] ? toSemester(match[5] + '-' + match[6] + '-' + match[7]) : {
            index: 3,
            start_year: 99,
            end_year: 99,
        },
    };
}

/**
 *
 * @param {Semester} semester
 *
 * @return {String} display
 *
 */
function getYearDisplay(semester) {
    return semester.index === 1 ? `${semester.start_year}` : `${semester.end_year}`;
}

/**
 *
 * @param {Member[]} members
 *
 * @returns {Member[]} members
 *
 */
function processExtraFields(members) {
    return members.map((member) => {
        // sort by orders: start_semester.start_year, start_semester.end_year, start_semester.index, end_semester.start_year, end_semester.end_year, end_semester.index
        member.role_history = member.role_history.sort((b, a) => {
            const aStart = a.start_semester;
            const bStart = b.start_semester;
            const aEnd = a.end_semester;
            const bEnd = b.end_semester;

            if (aStart.start_year !== bStart.start_year) return aStart.start_year - bStart.start_year;
            if (aStart.end_year !== bStart.end_year) return aStart.end_year - bStart.end_year;
            if (aStart.index !== bStart.index) return aStart.index - bStart.index;
            if (aEnd && !bEnd) return 1;
            if (!aEnd && bEnd) return -1;
            if (aEnd.start_year !== bEnd.start_year) return aEnd.start_year - bEnd.start_year;
            if (aEnd.end_year !== bEnd.end_year) return aEnd.end_year - bEnd.end_year;
            if (aEnd.index !== bEnd.index) return aEnd.index - bEnd.index;
            return 0;
        });

        // get current role title
        if (member.role_history.length > 0) {
            const currentRole = member.role_history[0].role;
            member.current_role_title = roleTitleMap[currentRole];
            member.current_role_index = Object.keys(roleTitleMap).indexOf(currentRole);
        } else {
            member.current_role_title = roleTitleMap['M'];
            member.current_role_index = Object.keys(roleTitleMap).indexOf('M');
        }

        // handle role titles by format 20<start_semester>-20<end_semester> <role_title> for each role
        member.role_titles = member.role_history.map((record) => {
            const startYear = `20${getYearDisplay(record.start_semester)}`;
            const endYear = record.end_semester.index === 3 ? 'Hiện tại' : `20${getYearDisplay(record.end_semester)}`; //TODO: language mapping
            return `${startYear} - ${endYear}: ${roleTitleMap[record.role]}`;
        });

        return member;
    });
}

/**
 *
 * @param {object[]} raws: raw data from notion
 *
 * @returns {Member[]} members: array of member objects
 *
 */
export function toMemberObjects(raws) {
    return processExtraFields(raws.map((raw) => ({
        name: raw.name,
        role_history: raw.role_history.map((rawRecord) => toRoleRecord(rawRecord)),
        school_year: +raw.school_year,
        image: getImageFromProperty(raw.images)
    })).filter((member) => member.school_year && member.school_year > 0));
}

/**
 *
 * @param {Object[]} data: data from notion
 *
 * @returns {Object[]} objects: array of objects that contains data of each member
 */
export function readNotionFields(data) {
    return data?.map((page) => page?.properties)?.map((props) => ({
        name: props?.name?.title?.[0]?.plain_text,
        role_history: props?.role_history?.multi_select?.map((select) => select?.name),
        school_year: props?.schoolyear?.select?.name,
        images: props?.images,
    }));
}