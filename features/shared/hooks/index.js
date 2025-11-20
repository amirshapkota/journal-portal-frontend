import { useGetRoleList } from "./query/useGetRoleList";
import { clearStoredRole, useCurrentRole } from "./useCurrentRole";
import useRoleRedirect from "./useRoleRedirect";
import { useToggle } from "./useToggle";
import { useGetJournals } from "./useGetJournals";
import { useGetTaxonomyTree } from "./useGetTaxonomyTree";
import { useGetMyAnalytics } from "./useGetMyAnalytics";
import { useSaveSuperdocDocument } from "./mutation/useSaveSuperdocDocument";

export {
  useToggle,
  useRoleRedirect,
  useGetRoleList,
  useCurrentRole,
  clearStoredRole,
  useGetJournals,
  useGetTaxonomyTree,
  useGetMyAnalytics,
  useSaveSuperdocDocument,
};
