const http = require('https');

async function request(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, 'https://frontend-task-chatapp.onrender.com');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(url, { method, headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function run() {
  const user1 = await request('/api/auth/login', 'POST', { phone: '+15551111111', name: 'Ada Lovelace' });
  const user2 = await request('/api/auth/login', 'POST', { phone: '+15552222222', name: 'Alan Turing' });
  const token1 = user1.data.token;
  const token2 = user2.data.token;
  const user2Id = user2.data.user._id;

  console.log('\n--- Testing Group Endpoints ---');

  // Try creating group with at least 2 other participantIds or minimum participant count requirement?
  // Let's create User 3 first
  const user3 = await request('/api/auth/login', 'POST', { phone: '+15553333333', name: 'Grace Hopper' });
  const user3Id = user3.data.user._id;

  const group1 = await request('/api/conversations/group', 'POST', { name: 'Pioneers Team', participantIds: [user2Id] }, token1);
  console.log('Group with 1 participant:', JSON.stringify(group1, null, 2));

  const group2 = await request('/api/conversations/group', 'POST', { name: 'Pioneers Team', participantIds: [user2Id, user3Id] }, token1);
  console.log('Group with 2 participants:', JSON.stringify(group2, null, 2));

  const groupObj = group2.data?.conversation || group2.data;
  const groupId = groupObj?._id || groupObj?.id;

  if (groupId) {
    // Test Rename Group
    console.log('\nRename Group:');
    const rename = await request(`/api/conversations/${groupId}`, 'PATCH', { name: 'Updated Pioneers' }, token1);
    console.log(JSON.stringify(rename, null, 2));

    // Test Add Participant
    console.log('\nAdd Participant:');
    const user4 = await request('/api/auth/login', 'POST', { phone: '+15554444444', name: 'Margaret Hamilton' });
    const addPart = await request(`/api/conversations/${groupId}/participants`, 'POST', { userIds: [user4.data.user._id] }, token1);
    console.log(JSON.stringify(addPart, null, 2));

    // Test Promote to Admin
    console.log('\nPromote to Admin:');
    const promote = await request(`/api/conversations/${groupId}/admins`, 'POST', { userId: user2Id }, token1);
    console.log(JSON.stringify(promote, null, 2));

    // Test Remove Participant
    console.log('\nRemove Participant:');
    const removePart = await request(`/api/conversations/${groupId}/participants/${user4.data.user._id}`, 'DELETE', null, token1);
    console.log(JSON.stringify(removePart, null, 2));
  }
}

run().catch(console.error);
