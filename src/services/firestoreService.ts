import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

function sortByCreatedAt(docs: any[]) {
  return docs.sort((a, b) => {
    const ta = a.createdAt?.toMillis?.() ?? 0;
    const tb = b.createdAt?.toMillis?.() ?? 0;
    return tb - ta;
  });
}

export async function saveAssessment(uid: string, data: any) {
  try {
    const ref = await addDoc(collection(db, "assessments"), {
      uid,
      ...data,
      phase: "pre",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  } catch (e: any) {
    console.warn("saveAssessment failed:", e.message);
    return null;
  }
}

export async function getLatestAssessment(uid: string) {
  try {
    const q = query(
      collection(db, "assessments"),
      where("uid", "==", uid),
      where("phase", "==", "pre"),
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const sorted = sortByCreatedAt(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return sorted[0];
  } catch (e: any) {
    console.warn("getLatestAssessment failed:", e.message);
    return null;
  }
}

export async function getLatestPostAssessment(uid: string) {
  try {
    const q = query(
      collection(db, "assessments"),
      where("uid", "==", uid),
      where("phase", "==", "post"),
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const sorted = sortByCreatedAt(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    return sorted[0];
  } catch (e: any) {
    console.warn("getLatestPostAssessment failed:", e.message);
    return null;
  }
}

export async function getUserAssessments(uid: string) {
  try {
    const q = query(collection(db, "assessments"), where("uid", "==", uid));
    const snap = await getDocs(q);
    return sortByCreatedAt(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (e: any) {
    console.warn("getUserAssessments failed:", e.message);
    return [];
  }
}

export async function getUserReports(uid: string) {
  try {
    const q = query(collection(db, "reports"), where("uid", "==", uid));
    const snap = await getDocs(q);
    return sortByCreatedAt(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (e: any) {
    console.warn("getUserReports failed:", e.message);
    return [];
  }
}

export async function savePostAssessment(uid: string, assessmentId: string, data: any) {
  try {
    const ref = await addDoc(collection(db, "assessments"), {
      uid,
      ...data,
      phase: "post",
      linkedAssessmentId: assessmentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  } catch (e: any) {
    console.warn("savePostAssessment failed:", e.message);
    return null;
  }
}

export async function saveReport(uid: string, reportData: any) {
  try {
    const ref = await addDoc(collection(db, "reports"), {
      uid,
      ...reportData,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (e: any) {
    console.warn("saveReport failed:", e.message);
    return null;
  }
}

export async function updateUserProfile(uid: string, data: any) {
  try {
    await updateDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() });
  } catch (e: any) {
    console.warn("updateUserProfile failed:", e.message);
  }
}

export async function getUserProfile(uid: string) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
  } catch (e: any) {
    console.warn("getUserProfile failed:", e.message);
    return null;
  }
}

export async function saveInterventionPlan(uid: string, assessmentId: string, plan: any) {
  try {
    await setDoc(doc(db, "interventionPlans", `${uid}_${assessmentId}`), {
      uid,
      assessmentId,
      ...plan,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (e: any) {
    console.warn("saveInterventionPlan failed:", e.message);
  }
}

export async function getInterventionPlan(uid: string, assessmentId: string) {
  try {
    const snap = await getDoc(doc(db, "interventionPlans", `${uid}_${assessmentId}`));
    return snap.exists() ? snap.data() : null;
  } catch (e: any) {
    console.warn("getInterventionPlan failed:", e.message);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e: any) {
    console.warn("getAllUsers failed:", e.message);
    return [];
  }
}

export async function assignEvaluator(evaluatorUid: string, studentUid: string) {
  try {
    const id = `${evaluatorUid}_${studentUid}`;
    await setDoc(doc(db, "evaluatorAssignments", id), {
      evaluatorUid,
      studentUid,
      active: true,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (e: any) {
    console.warn("assignEvaluator failed:", e.message);
    return false;
  }
}

export async function removeAssignment(evaluatorUid: string, studentUid: string) {
  try {
    const id = `${evaluatorUid}_${studentUid}`;
    await updateDoc(doc(db, "evaluatorAssignments", id), {
      removedAt: serverTimestamp(),
      active: false,
    });
    return true;
  } catch (e: any) {
    console.warn("removeAssignment failed:", e.message);
    return false;
  }
}

export async function getEvaluatorAssignments(evaluatorUid: string) {
  try {
    const q = query(
      collection(db, "evaluatorAssignments"),
      where("evaluatorUid", "==", evaluatorUid),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((a: any) => a.active !== false);
  } catch (e: any) {
    console.warn("getEvaluatorAssignments failed:", e.message);
    return [];
  }
}

export async function getStudentEvaluator(studentUid: string) {
  try {
    const q = query(collection(db, "evaluatorAssignments"), where("studentUid", "==", studentUid));
    const snap = await getDocs(q);
    const active = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((a: any) => a.active !== false);
    return active.length > 0 ? active[0] : null;
  } catch (e: any) {
    console.warn("getStudentEvaluator failed:", e.message);
    return null;
  }
}

export async function saveEvaluation(
  assessmentId: string,
  evaluatorUid: string,
  studentUid: string,
  pillar: string,
  scores: any,
) {
  try {
    const docId = `${assessmentId}_${pillar}`;
    await setDoc(doc(db, "evaluations", docId), {
      assessmentId,
      evaluatorUid,
      studentUid,
      pillar,
      scores,
      status: "completed",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (e: any) {
    console.warn("saveEvaluation failed:", e.message);
    return false;
  }
}

export async function getEvaluation(assessmentId: string, pillar: string) {
  try {
    const snap = await getDoc(doc(db, "evaluations", `${assessmentId}_${pillar}`));
    return snap.exists() ? snap.data() : null;
  } catch (e: any) {
    console.warn("getEvaluation failed:", e.message);
    return null;
  }
}

export async function getAllEvaluations(assessmentId: string) {
  try {
    const q = query(collection(db, "evaluations"), where("assessmentId", "==", assessmentId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e: any) {
    console.warn("getAllEvaluations failed:", e.message);
    return [];
  }
}

export async function updateUserRole(uid: string, role: string) {
  try {
    await updateDoc(doc(db, "users", uid), { role, updatedAt: serverTimestamp() });
    return true;
  } catch (e: any) {
    console.warn("updateUserRole failed:", e.message);
    return false;
  }
}
