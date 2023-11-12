import frappe
@frappe.whitelist()
def get_balance():
    balance = frappe.db.sql(""" SELECT SUM(tge.credit) - SUM(tge.debit) as balance
                                FROM `tabGL Entry` tge
                                INNER JOIN `tabAccount` ta ON tge.account = ta.name
                                WHERE ta.root_type  = 'Asset' AND ta.account_number < 1700 """, as_dict=True)[0].balance
    return balance
@frappe.whitelist()
def get_balance_chart():
    balance_chart = frappe.db.sql(""" Select ta.name, SUM(tge.credit) - SUM(tge.debit) as balance
                                        FROM `tabGL Entry` tge
                                        INNER JOIN `tabAccount` ta ON tge.account = ta.name
                                        WHERE ta.root_type  = 'Asset' AND ta.account_number < 1700
                                        GROUP by tge.account ORDer BY ta.name ASC; """)
    return balance_chart
