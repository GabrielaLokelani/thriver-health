import { generateClient } from "aws-amplify/api";
import { Schema } from '../../amplify/data/resource';


const client = generateClient<Schema>();

export async function loadPillars(groupId?: string, period?: number) {      
    let oldToken: string | undefined = undefined;
    let allPillars: any[] = []
    do {
        // @ts-ignore
        const { data, errors, nextToken } = await client.models.Pillar.list({ filter: 
            {
                ...(groupId && { groupId: { eq: groupId } }),
                ...(period && { period: { eq: period } })
            },
            nextToken: oldToken
        })
    
        if (errors) {
            console.error(errors);
        }

        if (data) {
            allPillars = [...allPillars, ...data]
        }
        oldToken = nextToken;
    } while (oldToken);



    return allPillars
}

export async function loadUserActivities(userId: string) {
    let allActivities: any[] = []
    let oldToken: string | undefined = undefined;

    do {
    // @ts-ignore
    const { data, errors, nextToken: token } = await client.models.UserActivity.list({
        filter: {
            userId: { eq: userId },
        },
        nextToken: oldToken
    })

    if (errors) {
        console.error(errors);
    }
    
    if (data) {
        allActivities = [...allActivities, ...data];
    }

    oldToken = token;
    } while (oldToken);
    
    return allActivities;
}

export async function loadUserDetails(cognitoSub: string) {
    let allUsers: any[] = []
    let oldToken: string | undefined = undefined;

    do {
    // @ts-ignore
    const { data, errors, nextToken: token } = await client.models.User.list({
        filter: {
            cognitoSub: { eq: cognitoSub },
        },
        nextToken: oldToken
    })

    if (errors) {
        console.error(errors);
    }
    
    if (data) {
        allUsers = [...allUsers, ...data];
    }

    oldToken = token;
    } while (oldToken);
    
    return allUsers;
}

export async function loadOrganization(id: string) {
    try {
        const { data } = await client.models.Organization.get({ id });
        return data;
    } catch (e) {
        console.error(e);
    }
}

export async function loadGroup(id: string) {
    const { data } = await client.models.Group.get({ id });
    return data
}

export async function loadUserActivityFeedback(activityId: string) {
    let allFeedback: any[] = []
    let oldToken: string | undefined = undefined;

    do {
    // @ts-ignore
    const { data, errors, nextToken: token } = await client.models.Feedback.list({
        filter: {
            userActivityId: { eq: activityId },
        },
        nextToken: oldToken
    })

    if (errors) {
        console.error(errors);
    }
    
    if (data) {
        allFeedback = [...allFeedback, ...data];
    }

    oldToken = token;
    } while (oldToken);
    
    return allFeedback;
}

export async function loadUserActivity(id: string) {
    try {
        const {data} = await client.models.UserActivity.get({ id })
        return data
    } catch (e) {
        console.error(e);
    }
}